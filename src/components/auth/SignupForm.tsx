import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Mail, Lock, User, X } from 'lucide-react';
import OTPForm from './OTPForm';

interface SignupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}


const SignupForm: React.FC<SignupFormProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_KEY}auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setShowOTP(true);
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      alert('Error sending OTP');
      console.error(err);
    }
  };
  
  

  

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-[#1f1f1f] rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-semibold text-white">
              {showOTP ? 'Enter OTP' : 'Create Account'}
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!showOTP ? (
            <form onSubmit={handleSendOTP}>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full bg-[#2d2d2d] text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

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

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 transition-colors"
                >
                  Send OTP
                </button>

                <p className="text-sm text-center text-gray-400 mt-4">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchToLogin();
                    }}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    Log in
                  </button>
                </p>

              </div>
            </form>
          ) : (
            <OTPForm onClose={onClose} email={formData.email} name={formData.name} password={formData.password} />

          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SignupForm;