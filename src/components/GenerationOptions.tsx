import React from 'react';
import { Image, Palette, Shapes, Pencil, Layers, Wind, Smile } from 'lucide-react';

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
  setSelectedStyle,
}) => {
  const options: GenerationOption[] = [
    { id: 'basic', name: 'Basic', icon: <Image className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'logo', name: 'Logo', icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: '3d-illustration', name: '3D Illustration', icon: <Shapes className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'sketch', name: 'Sketch', icon: <Pencil className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'abstract', name: 'Abstract', icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'ghibli', name: 'Ghibli', icon: <Wind className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: '3d-cartoon', name: '3D Cartoon', icon: <Smile className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  return (
    <div className="mt-4 overflow-x-auto pb-4">
      <div className="flex w-max gap-2 sm:gap-3 px-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedStyle(option.id)}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm transition-all whitespace-nowrap ${
              selectedStyle === option.id
                ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white'
                : 'bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]'
            }`}
          >
            {option.icon}
            <span>{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenerationOptions;
