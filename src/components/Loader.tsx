import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="mt-4 text-gray-400 text-lg">AI is creating your artwork...</p>
    </div>
  );
};

export default Loader;