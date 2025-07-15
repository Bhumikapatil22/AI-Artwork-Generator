import React from 'react';
import { Image, User } from 'lucide-react';

interface TabsProps {
  activeTab: 'explore' | 'creations';
  setActiveTab: (tab: 'explore' | 'creations') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-800 mb-4">
      <button
        className={`flex items-center px-6 py-3 border-b-2 transition-colors ${
          activeTab === 'explore'
            ? 'border-blue-500 text-blue-500'
            : 'border-transparent text-gray-400 hover:text-gray-300'
        }`}
        onClick={() => setActiveTab('explore')}
      >
        <Image className="w-5 h-5 mr-2" />
        Explore Ideas
      </button>
     
    </div>
  );
};

export default Tabs;