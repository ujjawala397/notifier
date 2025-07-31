
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AlarmCard from './components/AlarmCard';
import AddAlarmModal from './components/AddAlarmModal';

interface Alarm {
  id: string;
  time: string;
  label: string;
  isActive: boolean;
  repeatDays: string[];
  sound: string;
}

export default function AlarmsPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: '1',
      time: '06:30',
      label: 'Morning Workout',
      isActive: true,
      repeatDays: ['Mon', 'Wed', 'Fri'],
      sound: 'Sunrise'
    },
    {
      id: '2',
      time: '08:00',
      label: 'Work Start',
      isActive: true,
      repeatDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      sound: 'Digital'
    },
    {
      id: '3',
      time: '22:00',
      label: 'Sleep Time',
      isActive: false,
      repeatDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      sound: 'Gentle'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAlarm, setEditingAlarm] = useState<Alarm | null>(null);

useEffect(() => {
  setMounted(true);

  const audio = new Audio('/alarm.mp3'); // place a file in `public/alarm.mp3`

  const updateTime = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });

    const formattedDate = now.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

    setCurrentTime(formattedTime);
    setCurrentDate(formattedDate);

    // Check active alarms
    alarms.forEach(alarm => {
      if (
        alarm.isActive &&
        alarm.time === formattedTime &&
        alarm.repeatDays.includes(now.toLocaleDateString('en-US', { weekday: 'short' }))
      ) {
        audio.play().catch(err => {
          console.warn('Audio play failed:', err);
        });
      }
    });
  };

  updateTime();
  const interval = setInterval(updateTime, 1000); // Check every second

  return () => clearInterval(interval);
}, [alarms]);


  const toggleAlarm = (id: string) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
    ));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  const editAlarm = (alarm: Alarm) => {
    setEditingAlarm(alarm);
    setShowAddModal(true);
  };

  const saveAlarm = (alarmData: Omit<Alarm, 'id'>) => {
    if (editingAlarm) {
      setAlarms(alarms.map(alarm => 
        alarm.id === editingAlarm.id ? { ...alarmData, id: editingAlarm.id } : alarm
      ));
    } else {
      const newAlarm = {
        ...alarmData,
        id: Date.now().toString()
      };
      setAlarms([...alarms, newAlarm]);
    }
    setShowAddModal(false);
    setEditingAlarm(null);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingAlarm(null);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white shadow-sm fixed top-0 w-full z-10">
          <div className="max-w-sm mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="w-6 h-6 flex items-center justify-center mr-3">
                <i className="ri-arrow-left-line text-xl text-gray-700"></i>
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">Alarms</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="w-8 h-8 flex items-center justify-center">
                <i className="ri-settings-3-line text-xl text-gray-600"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center">
                <i className="ri-user-line text-xl text-gray-600"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-20 pb-20 max-w-sm mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-gray-900 mb-2">--:--</div>
            <div className="text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm fixed top-0 w-full z-10">
        <div className="max-w-sm mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="w-6 h-6 flex items-center justify-center mr-3">
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Alarms</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 flex items-center justify-center">
              <i className="ri-settings-3-line text-xl text-gray-600"></i>
            </button>
            <button className="w-8 h-8 flex items-center justify-center">
              <i className="ri-user-line text-xl text-gray-600"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-20 max-w-sm mx-auto px-4">
        {/* Time Display */}
        <div className="text-center mb-8" suppressHydrationWarning={true}>
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {currentTime}
          </div>
          <div className="text-gray-600">
            {currentDate}
          </div>
        </div>

        {/* Alarms List */}
        <div className="space-y-4">
          {alarms.map(alarm => (
            <AlarmCard
              key={alarm.id}
              alarm={alarm}
              onToggle={() => toggleAlarm(alarm.id)}
              onEdit={() => editAlarm(alarm)}
              onDelete={() => deleteAlarm(alarm.id)}
            />
          ))}
        </div>

        {/* Add Alarm Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-500 to-blue-600 !rounded-button shadow-lg flex items-center justify-center"
        >
          <i className="ri-add-line text-2xl text-white"></i>
        </button>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <AddAlarmModal
          alarm={editingAlarm}
          onSave={saveAlarm}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
