import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Review Management SaaS
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Manage and respond to customer reviews effortlessly
        </p>
        {user ? (
          <div className="space-x-4">
            <Link
              to="/dashboard"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/settings"
              className="inline-block px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Settings
            </Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/signup"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;



