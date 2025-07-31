
'use client';

import { useState, useEffect } from 'react';

interface Alarm {
  id: string;
  time: string;
  label: string;
  isActive: boolean;
  repeatDays: string[];
  sound: string;
}

interface AddAlarmModalProps {
  alarm?: Alarm | null;
  onSave: (alarm: Omit<Alarm, 'id'>) => void;
  onClose: () => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SOUNDS = ['Sunrise', 'Digital', 'Gentle', 'Classic', 'Chimes', 'Bell'];

export default function AddAlarmModal({ alarm, onSave, onClose }: AddAlarmModalProps) {
  const [time, setTime] = useState('07:00');
  const [label, setLabel] = useState('');
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [sound, setSound] = useState('Sunrise');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (alarm) {
      setTime(alarm.time);
      setLabel(alarm.label);
      setRepeatDays(alarm.repeatDays);
      setSound(alarm.sound);
      setIsActive(alarm.isActive);
    }
  }, [alarm]);

  const toggleDay = (day: string) => {
    setRepeatDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSave = () => {
    if (!time) return;
    
    onSave({
      time,
      label: label || 'Alarm',
      repeatDays,
      sound,
      isActive
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-sm mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {alarm ? 'Edit Alarm' : 'Add New Alarm'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl text-2xl font-bold text-center"
          />
        </div>

        {/* Label Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Alarm label"
            className="w-full p-3 border border-gray-200 rounded-xl"
          />
        </div>

        {/* Repeat Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Repeat</label>
          <div className="grid grid-cols-7 gap-2">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`h-10 rounded-full text-xs font-medium ${
                  repeatDays.includes(day)
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sound</label>
          <div className="grid grid-cols-2 gap-2">
            {SOUNDS.map(soundOption => (
              <button
                key={soundOption}
                onClick={() => setSound(soundOption)}
                className={`p-3 rounded-xl text-sm font-medium ${
                  sound === soundOption
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {soundOption}
              </button>
            ))}
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Active</span>
          <div 
            onClick={() => setIsActive(!isActive)}
            className={`relative w-12 h-7 rounded-full cursor-pointer transition-colors ${
              isActive ? 'bg-indigo-500' : 'bg-gray-200'
            }`}
          >
            <div 
              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                isActive ? 'transform translate-x-5' : 'translate-x-1'
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 !rounded-button border border-gray-200 text-gray-600 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!time}
            className="flex-1 py-3 px-4 !rounded-button bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
