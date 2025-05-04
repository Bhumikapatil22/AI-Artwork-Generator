import React from 'react';
import { Search } from 'lucide-react';
import Card from './Card';
import { Post } from '../types';

interface CommunityImagesProps {
  posts: Post[] | null;
  searchText: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: Post[] | null;
  isLoading: boolean;
}

const CommunityImages: React.FC<CommunityImagesProps> = ({
  posts,
  searchText,
  handleSearchChange,
  searchResults,
  isLoading
}) => {
  const displayPosts = searchText ? searchResults : posts;

  return (
    <div className="mt-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search community creations..."
            className="w-full bg-[#2d2d2d] text-white border border-gray-700 rounded-full px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>
      </div>

      {searchText && (
        <h2 className="text-xl font-medium text-gray-300 mt-6 max-w-4xl mx-auto">
          Showing results for <span className="text-white">{searchText}</span>
        </h2>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          {displayPosts && displayPosts.length > 0 ? (
            displayPosts.map((post) => <Card key={post._id} {...post} />)
          ) : (
            <div className="col-span-full text-center py-10">
              <h2 className="text-xl font-medium text-gray-400">
                {searchText ? 'No results found' : 'No community posts yet'}
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityImages;