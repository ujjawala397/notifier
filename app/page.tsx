
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-sm w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-pacifico">logo</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600">Join thousands of users today</p>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-4">
          <Link
            href="/auth/register"
            className="block w-full !rounded-button bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-4 text-center font-semibold"
          >
            Create Account
          </Link>
          
          <Link
            href="/auth/login"
            className="block w-full !rounded-button border-2 border-indigo-500 text-indigo-600 py-4 text-center font-semibold hover:bg-indigo-50"
          >
            Sign In
          </Link>

          <Link
            href="/alarms"
            className="block w-full !rounded-button bg-gray-100 text-gray-700 py-4 text-center font-semibold hover:bg-gray-200"
          >
            Continue as Guest
          </Link>
        </div>

        {/* Features */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-shield-check-line text-green-600"></i>
            </div>
            <span className="text-gray-700">Secure OTP verification</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-smartphone-line text-blue-600"></i>
            </div>
            <span className="text-gray-700">Mobile-first experience</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-speed-line text-purple-600"></i>
            </div>
            <span className="text-gray-700">Fast and reliable</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>By continuing, you agree to our</p>
          <div className="mt-1">
            <button className="text-indigo-600 hover:underline mr-4">Terms of Service</button>
            <button className="text-indigo-600 hover:underline">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
