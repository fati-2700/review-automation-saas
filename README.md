# Review Management SaaS

A full-stack application for managing and responding to customer reviews, built with Node.js, Express, Prisma, PostgreSQL, React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🔐 **Authentication**: JWT-based user authentication with bcrypt password hashing
- 📝 **Review Management**: Create, view, filter, and search reviews
- ✍️ **Response Generation**: Template-based response generation (no OpenAI required)
- 🎨 **Brand Voice**: Customizable tone and sign-off settings
- 📊 **Dashboard**: Interactive dashboard with editable responses
- 🚀 **Railway Ready**: Configured for easy deployment on Railway

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt for password hashing
- Express Rate Limiting

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

## Setup Instructions

### Prerequisites
- Node.js 20+ installed
- PostgreSQL database (local or hosted)
- npm or yarn

### Backend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/review_management?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Run Prisma migrations:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional):**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:5173`

## API Routes

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/me` - Get current user (requires authentication)

### Reviews
- `GET /api/reviews` - Get all reviews (with filters: rating, status, search)
- `GET /api/reviews/:id` - Get a single review
- `POST /api/reviews` - Create a review manually
- `POST /api/reviews/:id/approve` - Approve and publish a review response

### Responses
- `PATCH /api/responses/:id` - Update response text

### Settings
- `GET /api/settings/brand-voice` - Get brand voice settings
- `PUT /api/settings/brand-voice` - Update brand voice settings

## Response Generation

The app uses template-based response generation (no OpenAI required). Responses are automatically generated based on the review rating:

- **5 stars**: "Thank you for the wonderful feedback! We're thrilled you had a great experience."
- **4 stars**: "Thank you for your review! We appreciate your feedback and are always working to improve."
- **3 stars**: "Thank you for your feedback. We'd love to hear more about your experience. Please contact us at [contact]."
- **1-2 stars**: "We sincerely apologize for your experience. This is not up to our standards. Please contact us directly at [contact] so we can make this right."

The brand voice settings (tone and sign-off) are automatically applied to generated responses.

## Deployment on Railway

### Prerequisites
- Railway account
- PostgreSQL database on Railway

### Steps

1. **Create a new Railway project** and connect your repository

2. **Add PostgreSQL service** to your project and copy the `DATABASE_URL`

3. **Set environment variables** in Railway:
   - `DATABASE_URL` - Your Railway PostgreSQL connection string
   - `JWT_SECRET` - A strong random secret for JWT tokens
   - `PORT` - Railway will set this automatically (usually 3000)
   - `NODE_ENV` - Set to `production`
   - `FRONTEND_URL` - Your frontend URL (e.g., `https://your-frontend.vercel.app`)

4. **Deploy:**
   Railway will automatically detect the Dockerfile and deploy your backend.

5. **Deploy Frontend:**
   You can deploy the frontend separately on Vercel, Netlify, or Railway:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Set environment variable: `VITE_API_URL` to your backend URL

### Important Notes for Railway

- The Dockerfile includes Prisma migrations that run automatically on deploy
- Make sure to set all required environment variables
- The health check endpoint is at `/health`

## Development Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run Prisma migrations (development)
- `npm run prisma:deploy` - Deploy Prisma migrations (production)
- `npm run prisma:studio` - Open Prisma Studio

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Database Schema

- **User**: User accounts with email and password
- **Location**: Business locations associated with users
- **Review**: Customer reviews with ratings and text
- **Response**: Generated and editable responses to reviews
- **BrandVoiceSettings**: User's brand voice preferences
- **ResponseHistory**: History of response edits

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation
- SQL injection protection (via Prisma)

## License

ISC



