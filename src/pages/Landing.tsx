import React, { useState, useEffect } from 'react';
import { ScanSearch } from 'lucide-react';
import { Post } from '../types';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
const Landing: React.FC = () => {
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`$(import.meta.env.VITE_API_URL}/post`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setCommunityPosts(result.data.slice(0, 4));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const handleJoinCreate = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <nav className="bg-[#121212] text-white px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <ScanSearch className="h-6 w-6 text-blue-500" />
          <h1 className="text-base font-medium">AI Artwork Generator</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col gap-12">



          <div className="flex flex-col items-center gap-12">
            <h1 className="text-center text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 text-transparent bg-clip-text">
              Create images from words with AI
            </h1>

            <p className="text-center text-gray-400 max-w-2xl">
              Create anything you can imagine with AI. Just describe what you want to see,
              and our AI will generate unique images based on your description.
            </p>

            <div className="w-full max-w-xl">

              <button
                onClick={handleJoinCreate}
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-2 rounded-lg font-semibold"
              >
                Generate Artwork
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {communityPosts.length > 0 ? (
                communityPosts.map((post) => (
                  <div key={post._id} className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md">
                    <img
                      src={post.photo}
                      alt={post.prompt}
                      className="w-full h-[260px] object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm text-gray-400 line-clamp-2">{post.prompt}</p>
                    </div>
                  </div>
                ))
              ) : (
                Array(4).fill(null).map((_, index) => (
                  <div key={index} className="bg-[#1f1f1f] rounded-lg overflow-hidden animate-pulse shadow-md">
                    <div className="w-full h-[260px] bg-gray-800" />
                    <div className="p-3">
                      <div className="h-4 bg-gray-700 rounded w-3/4" />
                    </div>
                  </div>
                ))
              )}
            </div>

            <Footer />
          </div>

        </div>
      </div>


    </div>
  );
};

export default Landing;
