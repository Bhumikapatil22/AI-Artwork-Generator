import React from 'react';
import { Image, Palette, Shapes, Pencil, Layers, Wind,Smile  } from 'lucide-react';

interface GenerationOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface GenerationOptionsProps {
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
}

const GenerationOptions: React.FC<GenerationOptionsProps> = ({ 
  selectedStyle, 
  setSelectedStyle 
}) => {
  const options: GenerationOption[] = [
    { id: 'basic', name: 'Basic', icon: <Image className="w-5 h-5" /> },
    { id: 'logo', name: 'Logo', icon: <Palette className="w-5 h-5" /> },
    { id: '3d-illustration', name: '3D Illustration', icon: <Shapes className="w-5 h-5" /> },
    { id: 'sketch', name: 'Sketch', icon: <Pencil className="w-5 h-5" /> },
    { id: 'abstract', name: 'Abstract', icon: <Layers className="w-5 h-5" /> },
    { id: 'ghibli', name: 'Ghibli', icon: <Wind className="w-5 h-5" /> },
    { id: '3d-cartoon', name: '3D Cartoon', icon: <Smile className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => setSelectedStyle(option.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
            selectedStyle === option.id
              ? 'bg-blue-600 text-white'
              : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]'
          }`}
        >
          {option.icon}
          <span>{option.name}</span>
        </button>
      ))}
    </div>
  );
};

export default GenerationOptions;