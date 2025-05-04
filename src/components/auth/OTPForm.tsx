import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface OTPFormProps {
  onClose: () => void;
  email: string;
  name: string;
  password: string;
}


const OTPForm: React.FC<OTPFormProps> = ({ onClose, email, name, password }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  const navigate = useNavigate();
  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    if (otp.some((digit) => digit === '')) {
      return alert('Please enter all 6 digits of the OTP.');
    }
    e.preventDefault();
    const otpValue = otp.join('');

    try {
      // Step 1: Verify OTP
      const otpRes = await fetch('http://localhost:8000/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, enteredOtp: otpValue }),
      });

      const otpData = await otpRes.json();
      if (!otpRes.ok) {
        return alert(otpData.message || 'OTP verification failed');
      }

      // Step 2: Signup
      const signupRes = await fetch('http://localhost:8000/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const signupData = await signupRes.json();
      localStorage.setItem('token', signupData.token);
      
      if (signupRes.ok) {
        alert('Signup successful!');
        navigate('/home');
      } else {
        alert(signupData.error || 'Signup failed');
      }

    } catch (error) {
      console.error('Error during OTP verification or signup:', error);
      alert('Something went wrong');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <p className="text-gray-400 mb-6">
        Enter the 6-digit code sent to {email}
      </p>

      <div className="flex justify-between mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
              handleKeyDown(index, e);
            }}

            className="w-12 h-12 text-center bg-[#2d2d2d] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={otp.some(digit => !digit)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sign Up
      </button>

      <p className="text-gray-400 text-sm text-center mt-4">
        Didn't receive the code?{' '}
        <button type="button" className="text-blue-500 hover:text-blue-400">
          Resend
        </button>
      </p>
    </form>
  );
};

export default OTPForm;