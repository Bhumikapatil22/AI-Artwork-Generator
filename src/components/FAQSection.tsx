import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'What is Image Creator?',
      answer: 'Image Creator is an AI-powered tool that generates images based on text descriptions you provide. It uses advanced machine learning models to create unique visuals from your prompts.'
    },
    {
      id: 2,
      question: 'How do I use Image Creator?',
      answer: 'Simply type a descriptive prompt in the text field, select a style if desired, and click "Create". The AI will generate images based on your description. You can then save or share your favorites.'
    },
    {
      id: 3,
      question: 'What languages are supported?',
      answer: 'Image Creator currently supports English. We\'re working on adding support for additional languages in future updates.'
    },
    {
      id: 4,
      question: 'How do I create better prompts?',
      answer: 'Be specific and detailed in your descriptions. Include information about style, setting, colors, lighting, and mood. For example, instead of "a cat," try "a fluffy orange tabby cat sleeping on a windowsill at sunset with warm lighting."'
    },
    {
      id: 5,
      question: 'Can I delete my Image Creator profile and history?',
      answer: 'Yes, you can delete your profile and history from your account settings. This will remove all your saved prompts and generated images from our servers.'
    },
    {
      id: 6,
      question: 'Are there any limitations to what I can create?',
      answer: 'Yes, there are content policies that prohibit generating explicit, violent, or copyrighted content. Our system has filters to prevent the creation of inappropriate images.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-8">
        Frequently asked questions
      </h2>
      
      <div className="space-y-4">
        {faqItems.map((item) => (
          <div 
            key={item.id} 
            className="border-b border-gray-700 pb-4"
          >
            <button
              className="flex justify-between items-center w-full text-left py-3 focus:outline-none"
              onClick={() => toggleItem(item.id)}
            >
              <span className="text-base sm:text-lg font-medium text-white">
                {item.id}. {item.question}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  openItem === item.id ? 'transform rotate-180' : ''
                }`} 
              />
            </button>
            
            {openItem === item.id && (
              <div className="mt-2 text-sm sm:text-base text-gray-400 pb-4 animate-fadeIn">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
