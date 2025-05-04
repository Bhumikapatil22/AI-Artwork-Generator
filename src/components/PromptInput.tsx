import React from 'react';
// import { Sparkles } from 'lucide-react';
import { FormData } from '../types';

interface PromptInputProps {
  form: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSurpriseMe: () => void;
  generateImages: () => Promise<void>;
  isGenerating: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({
  form,
  handleChange,
  handleSurpriseMe,
  generateImages,
  isGenerating
}) => {
  return (
    <div className=" rounded-lg p-4 mx-auto max-w-4xl mt-6 shadow-[20px_20px_30px_rgba(0,0,0,1)]  bg-[#2d2d2d]">
      <textarea
        name="prompt"
        placeholder="Describe the image you want created or select 'Surprise Me' to get inspired!"
        value={form.prompt}
        onChange={handleChange}
        className="w-full bg-[#404040]  text-white  rounded-lg  p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none h-16"
      />
      
      <div className="mt-3 flex justify-between items-center text-sm text-gray-400">
        <span>{form.prompt.length > 0 ? `${form.prompt.length} characters` : "14/15 fast creations"}</span>
        <div className="flex space-x-2">
          <button
            onClick={handleSurpriseMe}
            className="border-2 border-gray-400 bg-transparent hover:bg-gray-700 text-white rounded-full px-4 transition-colors"
          >
            <div className="flex items-center">
              
                  <span >Surprise Me</span>
            </div>
          </button>
          
          <button
            onClick={generateImages}
            disabled={isGenerating || !form.prompt}
            className={`bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-2 transition-colors ${
              isGenerating || !form.prompt ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;