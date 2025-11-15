import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface Review {
  id: string;
  customerName?: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  status: string;
  location: {
    id: string;
    name: string;
    address?: string;
  };
  response?: {
    id: string;
    draftText: string;
    finalText?: string;
    status: string;
    characterCount: number;
    publishedAt?: string;
  };
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filterRating, setFilterRating] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [filterRating, searchQuery]);

  const fetchReviews = async () => {
    try {
      const params: any = {};
      if (filterRating) params.rating = filterRating;
      if (searchQuery) params.search = searchQuery;

      const response = await axios.get(`${API_URL}/api/reviews`, { params });
      setReviews(response.data);
      if (selectedReview) {
        const updated = response.data.find((r: Review) => r.id === selectedReview.id);
        if (updated) {
          setSelectedReview(updated);
          setResponseText(updated.response?.draftText || '');
        }
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewClick = (review: Review) => {
    setSelectedReview(review);
    setResponseText(review.response?.draftText || '');
  };

  const handleSave = async () => {
    if (!selectedReview?.response) return;

    setSaving(true);
    try {
      await axios.patch(
        `${API_URL}/api/responses/${selectedReview.response.id}`,
        { text: responseText }
      );
      await fetchReviews();
      alert('Response saved successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to save response');
    } finally {
      setSaving(false);
    }
  };

  const handleApproveAndPublish = async () => {
    if (!selectedReview) return;

    setSaving(true);
    try {
      await axios.post(`${API_URL}/api/reviews/${selectedReview.id}/approve`);
      await fetchReviews();
      alert('Response approved and published!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to publish response');
    } finally {
      setSaving(false);
    }
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Review Management</h1>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/settings"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Settings
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reviews List */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>

              {/* Filters */}
              <div className="mb-4 space-y-2">
                <div>
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No reviews found</p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      onClick={() => handleReviewClick(review)}
                      className={`p-4 border rounded-lg cursor-pointer transition ${
                        selectedReview?.id === review.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-yellow-500 font-semibold">
                            {renderStars(review.rating)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {review.customerName || 'Anonymous'}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            review.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : review.status === 'responded'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {review.status}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-2">{review.reviewText}</p>
                      <div className="text-xs text-gray-500 mt-2">
                        {review.location.name}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Response Editor */}
          <div>
            {selectedReview ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Response</h2>

                {/* Review Info */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-yellow-500 font-semibold mb-1">
                        {renderStars(selectedReview.rating)}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {selectedReview.customerName || 'Anonymous'}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{selectedReview.reviewText}</p>
                </div>

                {/* Response Editor */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Response Text
                  </label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <div className="text-sm text-gray-500 mt-2">
                    Characters: {responseText.length}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleApproveAndPublish}
                    disabled={saving}
                    className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    {saving ? 'Publishing...' : 'Approve & Publish'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-500 text-center py-8">
                  Select a review to view and edit its response
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

