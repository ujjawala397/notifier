
'use client';

interface Alarm {
  id: string;
  time: string;
  label: string;
  isActive: boolean;
  repeatDays: string[];
  sound: string;
}

interface AlarmCardProps {
  alarm: Alarm;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AlarmCard({ alarm, onToggle, onEdit, onDelete }: AlarmCardProps) {
  const formatRepeatDays = (days: string[]) => {
    if (days.length === 7) return 'Every day';
    if (days.length === 5 && !days.includes('Sat') && !days.includes('Sun')) {
      return 'Weekdays';
    }
    if (days.length === 2 && days.includes('Sat') && days.includes('Sun')) {
      return 'Weekends';
    }
    return days.join(', ');
  };

  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm ${alarm.isActive ? 'border-l-4 border-indigo-500' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-baseline">
            <span className={`text-3xl font-bold ${alarm.isActive ? 'text-gray-900' : 'text-gray-400'}`}>
              {alarm.time}
            </span>
            <span className={`ml-2 text-sm ${alarm.isActive ? 'text-gray-600' : 'text-gray-400'}`}>
              {alarm.label}
            </span>
          </div>
          
          <div className="flex items-center mt-2 space-x-4">
            <span className={`text-xs ${alarm.isActive ? 'text-gray-500' : 'text-gray-400'}`}>
              {formatRepeatDays(alarm.repeatDays)}
            </span>
            <span className={`text-xs ${alarm.isActive ? 'text-gray-500' : 'text-gray-400'}`}>
              {alarm.sound}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onEdit}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            <i className="ri-edit-line"></i>
          </button>
          
          <button
            onClick={onDelete}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500"
          >
            <i className="ri-delete-bin-line"></i>
          </button>
          
          <div 
            onClick={onToggle}
            className={`relative w-12 h-7 rounded-full cursor-pointer transition-colors ${
              alarm.isActive ? 'bg-indigo-500' : 'bg-gray-200'
            }`}
          >
            <div 
              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                alarm.isActive ? 'transform translate-x-5' : 'translate-x-1'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
