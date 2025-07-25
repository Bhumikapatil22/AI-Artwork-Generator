import React, { useEffect, useState } from 'react';
import { ScanSearch, User, Search, LogOut } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  name: string;
  email: string;
  userId: string;
  exp: number;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="bg-[#121212] text-white px-4 py-3 flex items-center justify-between border-b border-gray-800 relative">
      <div className="flex items-center space-x-4">
        <ScanSearch className="h-6 w-6 text-blue-500" />
        <h1 className="text-base font-medium">AI Artwork Generator</h1>

        <div className="relative group">
          <div className="bg-[#1e1e1e] p-2 rounded-full cursor-pointer">
            <Search className="h-5 w-5 text-gray-300" />
          </div>
          <span className="absolute left-12 top-1/2 -translate-y-1/2 text-sm text-gray-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-left whitespace-nowrap">
            Search Posts
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-6">

        <div className="hidden md:flex items-center space-x-2 relative">

          {showProfilePopup && user && (
            <div className="absolute top-12 right-0 bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 w-64 z-50 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">{user.name}</div>
                  <div className="text-sm text-gray-400">{user.email}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-800 rounded-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
