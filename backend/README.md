# Change Now v2

A full-stack application for crypto exchange functionality.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## Project Structure

```
change-now-v2/
├── backend/         # NestJS backend application
├── frontend/        # React + Vite frontend application
└── test/           # E2E test suite
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with required environment variables:
```env
# Server Configuration
PORT=3000

# ChangeNow API Configuration
CHANGENOW_API_KEY=bac48ddfc5bf69b7a6a515bbfa785ea4888582ddd4bf3e88639faa8f30a335ef

# Note: For development and testing purposes only. In production, use secure environment-specific values.
```

4. Start the development server:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3000`

### Backend Scripts

- `npm run build` - Build the application
- `npm run start` - Start the production server
- `npm run start:dev` - Start the development server with hot-reload
- `npm test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Frontend Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Running Tests

The project includes a comprehensive test suite in the `test` directory.

1. Navigate to the test directory:
```bash
cd test
```

2. Install test dependencies:
```bash
npm install
```

3. Run the E2E test suite:
```bash
npm test
```

## Development Guidelines

- Follow the existing code style and formatting rules
- Write tests for new features
- Update documentation when making significant changes
- Use TypeScript for type safety
- Follow the component structure in frontend/src/components
- Follow the module structure in backend/src/modules

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components

### Backend
- NestJS
- TypeScript
- Jest (Testing)

## API Documentation

API documentation is available at `http://localhost:3000/api` when running the backend server.
