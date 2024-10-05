import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen px-4">
      <img
        src="/assets/pageNotFound.svg"
        alt="404 Not Found"
        className="w-full max-w-xs sm:max-w-md lg:max-w-lg mb-8"
      />
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-500 mb-4">
        404
      </h1>
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 mb-6 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 text-sm sm:text-base lg:text-lg text-white bg-primary-500 hover:bg-primary-600 rounded-lg shadow-md transition duration-300"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
