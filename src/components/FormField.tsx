import React from 'react';
import { Sparkles } from 'lucide-react';

interface FormFieldProps {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-300"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="flex items-center text-xs font-semibold text-gray-300 bg-[#2a2a2a] py-1 px-2 rounded-md hover:bg-[#333333]"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Surprise Me
          </button>
        )}
      </div>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="bg-[#2d2d2d] text-white border border-gray-700 text-sm rounded-lg w-full p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FormField;