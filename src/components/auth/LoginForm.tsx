// import React, { useState } from 'react';
// import { Dialog } from '@headlessui/react';
// import { Mail, Lock, X } from 'lucide-react';

// interface LoginFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSwitchToSignup: () => void;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ isOpen, onClose, onSwitchToSignup }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Login submitted:', formData);
//     // Handle login here
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onClose={onClose} className="relative z-50">
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

//       <div className="fixed inset-0 flex items-center justify-center p-4">
//         <Dialog.Panel className="w-full max-w-md bg-[#1f1f1f] rounded-xl p-6 shadow-xl">
//           <div className="flex justify-between items-center mb-6">
//             <Dialog.Title className="text-xl font-semibold text-white">
//               Welcome Back
//             </Dialog.Title>
//             <button onClick={onClose} className="text-gray-400 hover:text-white">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email Address"
//                   className="w-full bg-[#2d2d2d] text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   className="w-full bg-[#2d2d2d] text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div className="flex items-center justify-between text-sm">
//                 <label className="flex items-center text-gray-400">
//                   <input type="checkbox" className="mr-2" />
//                   Remember me
//                 </label>
//                 <button type="button" className="text-blue-500 hover:text-blue-400">
//                   Forgot Password?
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 transition-colors"
//               >
//                 Log In
//               </button>
//               <p className="text-sm text-center text-gray-400 mt-4">
//                 Don’t have an account?{' '}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     onClose();
//                     onSwitchToSignup();
//                   }}
//                   className="text-blue-500 hover:text-blue-400"
//                 >
//                   Sign up
//                 </button>
//               </p>

//             </div>
//           </form>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Mail, Lock, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}auth/login`, formData);
      
      // Store token
      // localStorage.setItem('authToken', response.data.token); // or just "true" if no token
      localStorage.setItem('token', response.data.token);
      console.log('Login successful:', response.data);
  
      onClose();
      navigate('/home');
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };
  

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-[#1f1f1f] rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-semibold text-white">
              Welcome Back
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-[#2d2d2d] text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-[#2d2d2d] text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-400">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <button type="button" className="text-blue-500 hover:text-blue-400">
                  Forgot Password?
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 transition-colors"
              >
                Log In
              </button>
              <p className="text-sm text-center text-gray-400 mt-4">
                Don’t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSwitchToSignup();
                  }}
                  className="text-blue-500 hover:text-blue-400"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LoginForm;
