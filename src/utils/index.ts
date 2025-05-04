import * as FileSaver from 'file-saver';

const surprisePrompts = [
  'A Bollywood dance party with dancers in vibrant traditional attire',
  'A serene Japanese garden with cherry blossoms falling gently',
  'A futuristic cityscape with flying cars and holographic advertisements',
  'A cozy cabin in the woods during a snowfall',
  'A surreal underwater scene with bioluminescent creatures',
  'A vibrant street market in Morocco with detailed spice displays',
  'A majestic dragon soaring through storm clouds',
  'An enchanted forest with glowing mushrooms and fairy lights',
  'A steampunk-inspired airship flying above Victorian London',
  'A cyberpunk neon-lit alley in a rainy night',
];

export const getRandomPrompt = (prompt: string): string => {
  const randomIndex = Math.floor(Math.random() * surprisePrompts.length);
  const randomPrompt = surprisePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
};

export const downloadImage = (_id: string, photo: string) => {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
};