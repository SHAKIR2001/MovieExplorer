import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
      <div className="absolute">
        <div className="px-6 py-3 bg-red-600 text-white text-sm rounded-lg">
          Page Not Found
        </div>
      </div>
      <p className="mt-16 mb-8 text-xl text-gray-600 dark:text-gray-300 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center"
      >
        <Home size={16} className="mr-2" />
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;