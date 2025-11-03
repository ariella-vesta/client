
import React from 'react';
import { StrategySession } from '../../types';
import { CalendarIcon } from '../ui/icons/CalendarIcon';
import { LinkIcon } from '../ui/icons/LinkIcon';

interface EditableStrategySessionProps {
  session: StrategySession;
  onUpdate: (updatedSession: StrategySession) => void;
  isReadOnly?: boolean;
}

const EditableStrategySessionCard: React.FC<EditableStrategySessionProps> = ({ session, onUpdate, isReadOnly = false }) => {
  
  const handleChange = (field: keyof StrategySession, value: string) => {
    onUpdate({ ...session, [field]: field === 'date' ? new Date(value) : value });
  };
  
  const toDateTimeLocal = (date: Date) => {
    const ten = (i: number) => (i < 10 ? '0' : '') + i;
    const YYYY = date.getFullYear();
    const MM = ten(date.getMonth() + 1);
    const DD = ten(date.getDate());
    const HH = ten(date.getHours());
    const mm = ten(date.getMinutes());
    return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
  };

  const InputField: React.FC<{label: string, id: string, type: string, value?: string, onChange: (val: string) => void}> = ({label, id, type, value, onChange}) => (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <div className="relative mt-1">
          <input
            type={type}
            id={id}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={isReadOnly}
            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-50 disabled:cursor-not-allowed"
          />
          {type === 'url' && value && (
            <a href={value} target="_blank" rel="noopener noreferrer" className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-indigo-600">
              <LinkIcon />
            </a>
          )}
        </div>
      </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-slate-800 tracking-wide flex items-center"><CalendarIcon /> <span className="ml-2">Strategy Session</span></h3>
      <InputField label="Session Date & Time" id="session-date" type="datetime-local" value={toDateTimeLocal(session.date)} onChange={(val) => handleChange('date', val)} />
      <InputField label="Zoom Link" id="zoom-link" type="url" value={session.zoomLink} onChange={(val) => handleChange('zoomLink', val)} />
      <InputField label="Google Calendar Link" id="gcal-link" type="url" value={session.googleCalendarLink} onChange={(val) => handleChange('googleCalendarLink', val)} />
      <InputField label="Recording URL" id="recording-url" type="url" value={session.recordingUrl} onChange={(val) => handleChange('recordingUrl', val)} />
    </div>
  );
};

export default EditableStrategySessionCard;