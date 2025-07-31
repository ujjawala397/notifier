
'use client';

import { useState } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PhoneInput({ value, onChange, placeholder }: PhoneInputProps) {
  const [countryCode, setCountryCode] = useState('+1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countries = [
    { code: '+1', name: 'US', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+91', name: 'IN', flag: '🇮🇳' },
    { code: '+86', name: 'CN', flag: '🇨🇳' },
    { code: '+81', name: 'JP', flag: '🇯🇵' },
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    onChange(input);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
      <div className="relative">
        <div className="flex">
          {/* Country Code Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center px-3 py-3 border border-r-0 border-gray-200 bg-gray-50 !rounded-button rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <span className="mr-2">{countries.find(c => c.code === countryCode)?.flag}</span>
              <span className="text-sm font-medium text-gray-700">{countryCode}</span>
              <i className="ri-arrow-down-s-line text-gray-500 ml-1"></i>
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 !rounded-button shadow-lg z-10">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setCountryCode(country.code);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left"
                  >
                    <span className="mr-3">{country.flag}</span>
                    <span className="text-sm font-medium text-gray-700">{country.code}</span>
                    <span className="ml-2 text-xs text-gray-500">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Phone Input */}
          <input
            type="tel"
            value={value}
            onChange={handlePhoneChange}
            placeholder={placeholder || "Enter phone number"}
            className="flex-1 px-4 py-3 border border-gray-200 !rounded-button rounded-l-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            maxLength={15}
          />
        </div>

        {/* Close dropdown when clicking outside */}
        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-5"
            onClick={() => setIsDropdownOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
