import React from 'react';

const Loader = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid mb-3"></div>
    <span className="text-gray-600 font-medium">{message}</span>
  </div>
);

export default Loader; 