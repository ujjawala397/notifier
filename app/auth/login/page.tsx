
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PhoneInput from '../components/PhoneInput';
import OtpInput from '../components/OtpInput';

export default function LoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Timer for resend functionality
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === 'otp' && resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer, step]);

  const sendOtpCode = async () => {
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setResendTimer(30); // 30 second timer
      setCanResend(false);
      // In real implementation, you would call your SMS API here
      console.log(`Sending OTP to ${phone}`);
    }, 1500);
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) return;
    await sendOtpCode();
  };

  const handleResendOtp = async () => {
    if (!canResend || loading) return;
    
    setLoading(true);
    setOtp(''); // Clear current OTP input
    
    // Simulate API call to resend OTP
    setTimeout(() => {
      setLoading(false);
      setResendTimer(30); // Reset timer to 30 seconds
      setCanResend(false);
      // In real implementation, you would call your SMS API here
      console.log(`Resending OTP to ${phone}`);
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to home or dashboard
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-sm mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="w-6 h-6 flex items-center justify-center mr-3">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Sign In</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-sm mx-auto w-full px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-smartphone-line text-3xl text-white"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">
            {step === 'phone' 
              ? 'Enter your mobile number to continue' 
              : 'Enter the verification code sent to your phone'
            }
          </p>
        </div>

        {step === 'phone' ? (
          <div className="space-y-6">
            <PhoneInput 
              value={phone}
              onChange={setPhone}
              placeholder="Enter your mobile number"
            />
            
            <button
              onClick={handleSendOtp}
              disabled={!phone || phone.length < 10 || loading}
              className="w-full !rounded-button bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending Code...
                </div>
              ) : (
                'Send Verification Code'
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Code sent to <span className="font-semibold">{phone}</span>
              </p>
              <button
                onClick={() => setStep('phone')}
                className="text-blue-600 text-sm font-medium"
              >
                Change number
              </button>
            </div>

            <OtpInput 
              value={otp}
              onChange={setOtp}
              length={6}
            />

            <button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6 || loading}
              className="w-full !rounded-button bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify & Sign In'
              )}
            </button>

            <div className="text-center">
              <button 
                onClick={handleResendOtp}
                disabled={!canResend || loading}
                className="text-gray-600 text-sm disabled:opacity-50"
              >
                Didn't receive code?{' '}
                {canResend ? (
                  <span className="text-blue-600 font-medium">
                    {loading ? 'Sending...' : 'Resend'}
                  </span>
                ) : (
                  <span className="text-gray-400">
                    Resend in {resendTimer}s
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-600 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}