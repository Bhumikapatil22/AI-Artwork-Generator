// import React from 'react';
// import { Download } from 'lucide-react';
// import { Post } from '../types';
// import { downloadImage } from '../utils';

// const Card: React.FC<Post> = ({ _id, name, prompt, photo }) => {
//   return (
//     <div className="relative group bg-[#1f1f1f] rounded-lg overflow-hidden">
//       <div className="aspect-square overflow-hidden">
//         <img
//           src={photo}
//           alt={prompt}
//           className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
//           loading="lazy"
//         />
//       </div>
      
//       <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/80 to-transparent p-4">
//         <p className="text-sm text-white line-clamp-2 mb-2">
//           {prompt}
//         </p>
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
//               <span className="text-xs font-bold text-white">
//                 {name.charAt(0).toUpperCase()}
//               </span>
//             </div>
//             <p className="text-sm text-gray-300">{name}</p>
//           </div>
          
//           <button
//             onClick={() => _id && downloadImage(_id, photo)}
//             className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
//           >
//             <Download className="w-4 h-4 text-white" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
import React from 'react';
import { Download } from 'lucide-react';
import { Post } from '../types';
import { downloadImage } from '../utils';

const Card: React.FC<Post> = ({ _id, prompt, photo, user }) => {
  const userName = user?.name || 'Unknown';

  return (
    <div className="relative group bg-[#1f1f1f] rounded-lg overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img
          src={photo}
          alt={prompt}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-sm text-white line-clamp-2 mb-2">
          {prompt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-300">{userName}</p>
          </div>

          <button
            onClick={() => _id && downloadImage(_id, photo)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Download className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
