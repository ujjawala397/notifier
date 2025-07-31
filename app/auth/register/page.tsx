
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PhoneInput from '../components/PhoneInput';
import OtpInput from '../components/OtpInput';

export default function RegisterPage() {
  const [step, setStep] = useState<'info' | 'phone' | 'otp'>('info');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
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

  const handleNext = () => {
    if (!formData.name || !formData.email) return;
    setStep('phone');
  };

  const sendOtpCode = async () => {
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setResendTimer(30); // 30 second timer
      setCanResend(false);
      // In real implementation, you would call your SMS API here
      console.log(`Sending OTP to ${formData.phone}`);
    }, 1500);
  };

  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) return;
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
      console.log(`Resending OTP to ${formData.phone}`);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-sm mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => {
              if (step === 'info') window.history.back();
              else if (step === 'phone') setStep('info');
              else setStep('phone');
            }}
            className="w-6 h-6 flex items-center justify-center mr-3"
          >
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Create Account</h1>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 'info' ? 'bg-green-500 text-white' : 'bg-green-500 text-white'
            }`}>
              {step !== 'info' ? <i className="ri-check-line"></i> : '1'}
            </div>
            <div className={`flex-1 h-1 mx-2 ${step !== 'info' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 'phone' ? 'bg-green-500 text-white' : step === 'otp' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step === 'otp' ? <i className="ri-check-line"></i> : '2'}
            </div>
            <div className={`flex-1 h-1 mx-2 ${step === 'otp' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 'otp' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-sm mx-auto w-full px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className={`text-3xl text-white ${
              step === 'info' ? 'ri-user-add-line' : 
              step === 'phone' ? 'ri-smartphone-line' : 
              'ri-shield-check-line'
            }`}></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'info' ? 'Personal Info' : 
             step === 'phone' ? 'Verify Mobile' : 
             'Almost Done'}
          </h2>
          <p className="text-gray-600">
            {step === 'info' ? 'Please fill in your basic information' : 
             step === 'phone' ? 'Enter your mobile number for verification' : 
             'Enter the verification code sent to your phone'}
          </p>
        </div>

        {step === 'info' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-200 !rounded-button focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 !rounded-button focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleNext}
              disabled={!formData.name || !formData.email}
              className="w-full !rounded-button bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'phone' && (
          <div className="space-y-6">
            <PhoneInput 
              value={formData.phone}
              onChange={(phone) => setFormData({...formData, phone})}
              placeholder="Enter your mobile number"
            />
            
            <button
              onClick={handleSendOtp}
              disabled={!formData.phone || formData.phone.length < 10 || loading}
              className="w-full !rounded-button bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
        )}

        {step === 'otp' && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Code sent to <span className="font-semibold">{formData.phone}</span>
              </p>
              <button
                onClick={() => setStep('phone')}
                className="text-green-600 text-sm font-medium"
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
              className="w-full !rounded-button bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Complete Registration'
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
                  <span className="text-green-600 font-medium">
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
            Already have an account?{' '}
            <Link href="/auth/login" className="text-green-600 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
