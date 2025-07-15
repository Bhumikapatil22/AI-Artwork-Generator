import React from 'react';
import Loader from './Loader';

interface ImageDisplayProps {
  photos: string[];
  isGenerating: boolean;
  previewImage: string;
  onShare: () => void;
  isSharing: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  photos,
  isGenerating,

}) => {
  if (isGenerating) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader />
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-8 mt-6">
        <h1 className="text-2xl md:text-4xl font-bold  mb-3">
          Create <span className="font-['Times_New_Roman',_serif] bg-gradient-to-r from-blue-500 to-emerald-500 text-transparent bg-clip-text"><i>Images</i></span> from words with AI
        </h1>
        
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative bg-[#1f1f1f] rounded-lg overflow-hidden aspect-square"
          >
            <img
              src={photo}
              alt={`Generated ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* <div className="mt-6 flex justify-center">
        <button
          onClick={onShare}
          disabled={isSharing}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-6 py-3 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>{isSharing ? 'Sharing...' : 'Share with Community'}</span>
        </button>
      </div> */}
    </div>
  );
};

export default ImageDisplay;