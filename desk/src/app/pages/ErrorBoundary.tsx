import { Link, useRouteError } from 'react-router';
import { AlertTriangle, Home } from 'lucide-react';

export default function ErrorBoundary() {
  const error = useRouteError() as any;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Oops!</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-4">
          {error?.statusText || error?.message || 'An unexpected error occurred'}
        </p>
        {error?.status === 404 && (
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist.
          </p>
        )}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg shadow-indigo-500/30"
        >
          <Home className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
