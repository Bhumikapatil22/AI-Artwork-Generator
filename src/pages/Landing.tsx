// import React, { useState, useEffect } from 'react';
// import { LoginForm, SignupForm } from '../components/auth';
// import { ScanSearch } from 'lucide-react';
// import { Post } from '../types';

// const Landing: React.FC = () => {
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isSignupOpen, setIsSignupOpen] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
//   const [prompt, setPrompt] = useState('');
//   const [communityPosts, setCommunityPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/v1/post", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const result = await response.json();
//           setCommunityPosts(result.data.slice(0, 4));
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setPrompt(e.target.value);
//     if (e.target.value && !showLogin && !showSignup) {
//       setShowLogin(true);
//     }
//   };

//   const handleJoinCreate = () => {

//     setShowLogin(true);
//   };

//   return (
//     <div className="min-h-screen bg-[#121212] text-white">
//       <nav className="bg-[#121212] text-white px-4 py-3 flex items-center justify-between border-b border-gray-800">
//         <div className="flex items-center space-x-4">
//           <ScanSearch className="h-6 w-6 text-blue-500" />
//           <h1 className="text-xl font-medium">Text-to-Artwork Generator</h1>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="flex flex-col md:flex-row gap-12">
//           {/* Left side - Prompt input */}
//           <div className="flex-1">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-emerald-500 text-transparent bg-clip-text">
//               Create images from words with AI
//             </h1>

//             <div className="bg-[#1f1f1f] rounded-lg p-4">
//               <textarea
//                 value={prompt}
//                 onChange={handlePromptChange}
//                 placeholder="Describe what you'd like to create..."
//                 className="w-full bg-[#2d2d2d] text-white border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none h-32"
//               />

//               <div className="mt-4 flex justify-between items-center">
//                 <p className="text-sm text-gray-400">
//                   Start with a detailed description
//                 </p>
//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => setShowSignup(true)}
//                     className="px-6 py-2 text-blue-500 hover:text-blue-400 font-medium"
//                   >
//                     Sign Up
//                   </button>
//                   <button
//                     onClick={handleJoinCreate}
//                     className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
//                   >
//                     Join & Create
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <p className="mt-6 text-gray-400">
//               Create anything you can imagine with AI. Just describe what you want to see,
//               and our AI will generate unique images based on your description.
//             </p>
//           </div>

//           {/* Right side - Example images */}
//           <div className="flex-1">
//             <div className="grid grid-cols-2 gap-4">
//               {communityPosts.length > 0 ? (
//                 communityPosts.map((post) => (
//                   <div key={post._id} className="bg-[#1f1f1f] rounded-lg overflow-hidden">
//                     <img
//                       src={post.photo}
//                       alt={post.prompt}
//                       className="w-full aspect-square object-cover"
//                     />
//                     <div className="p-3">
//                       <p className="text-sm text-gray-400 line-clamp-2">{post.prompt}</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 Array(4).fill(null).map((_, index) => (
//                   <div key={index} className="bg-[#1f1f1f] rounded-lg overflow-hidden animate-pulse">
//                     <div className="w-full aspect-square bg-gray-800" />
//                     <div className="p-3">
//                       <div className="h-4 bg-gray-800 rounded w-3/4" />
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <LoginForm
//         isOpen={isLoginOpen}
//         onClose={() => setIsLoginOpen(false)}
//         onSwitchToSignup={() => setIsSignupOpen(true)}
//       />

//       <SignupForm
//         isOpen={isSignupOpen}
//         onClose={() => setIsSignupOpen(false)}
//         onSwitchToLogin={() => setIsLoginOpen(true)}
//       />

//       <LoginForm isOpen={showLogin} onClose={() => setShowLogin(false)} />
//       <SignupForm isOpen={showSignup} onClose={() => setShowSignup(false)} />
//     </div>
//   );
// };

// export default Landing;
import React, { useState, useEffect } from 'react';
import { LoginForm, SignupForm } from '../components/auth';
import { ScanSearch } from 'lucide-react';
import { Post } from '../types';

const Landing: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/post", {
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

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);

    // Open login modal only if not already open
    if (e.target.value && !isLoginOpen && !isSignupOpen) {
      setIsLoginOpen(true);
    }
  };

  const handleJoinCreate = () => {
    setIsLoginOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <nav className="bg-[#121212] text-white px-4 py-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <ScanSearch className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-medium">Text-to-Artwork Generator</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left side - Prompt input */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-emerald-500 text-transparent bg-clip-text">
              Create images from words with AI
            </h1>

            <div className="bg-[#1f1f1f] rounded-lg p-4">
              <textarea
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Describe what you'd like to create..."
                className="w-full bg-[#2d2d2d] text-white border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none h-32"
              />

              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-400">
                  Start with a detailed description
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="px-6 py-2 text-blue-500 hover:text-blue-400 font-medium"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={handleJoinCreate}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Join & Create
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-6 text-gray-400">
              Create anything you can imagine with AI. Just describe what you want to see,
              and our AI will generate unique images based on your description.
            </p>
          </div>

          {/* Right side - Example images */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              {communityPosts.length > 0 ? (
                communityPosts.map((post) => (
                  <div key={post._id} className="bg-[#1f1f1f] rounded-lg overflow-hidden">
                    <img
                      src={post.photo}
                      alt={post.prompt}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm text-gray-400 line-clamp-2">{post.prompt}</p>
                    </div>
                  </div>
                ))
              ) : (
                Array(4).fill(null).map((_, index) => (
                  <div key={index} className="bg-[#1f1f1f] rounded-lg overflow-hidden animate-pulse">
                    <div className="w-full aspect-square bg-gray-800" />
                    <div className="p-3">
                      <div className="h-4 bg-gray-800 rounded w-3/4" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Single instance for login/signup */}
      <LoginForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />

      <SignupForm
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </div>
  );
};

export default Landing;
