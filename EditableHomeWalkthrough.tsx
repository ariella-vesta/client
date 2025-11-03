
import React from 'react';
import { HomeWalkthrough } from '../../../types';
import { CalendarIcon } from '../../ui/icons/CalendarIcon';
import { LinkIcon } from '../../ui/icons/LinkIcon';

interface EditableHomeWalkthroughProps {
  walkthrough: HomeWalkthrough;
  onUpdate: (updatedWalkthrough: HomeWalkthrough) => void;
  isReadOnly?: boolean;
}

const EditableHomeWalkthrough: React.FC<EditableHomeWalkthroughProps> = ({ walkthrough, onUpdate, isReadOnly = false }) => {
  
  const handleChange = (field: keyof HomeWalkthrough, value: string) => {
    onUpdate({ ...walkthrough, [field]: field === 'date' ? new Date(value) : value });
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

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-slate-800 tracking-wide flex items-center"><CalendarIcon /><span className="ml-2">Home Walkthrough</span></h3>
        <div>
          <label htmlFor="walkthrough-date" className="block text-sm font-medium text-slate-700">Walkthrough Date & Time</label>
          <input
            type="datetime-local"
            id="walkthrough-date"
            value={toDateTimeLocal(walkthrough.date)}
            onChange={(e) => handleChange('date', e.target.value)}
            disabled={isReadOnly}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="gcal-link-walkthrough" className="block text-sm font-medium text-slate-700">Google Calendar Link</label>
           <div className="relative mt-1">
              <input
                type="url"
                id="gcal-link-walkthrough"
                value={walkthrough.googleCalendarLink}
                onChange={(e) => handleChange('googleCalendarLink', e.target.value)}
                disabled={isReadOnly}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
              />
              {walkthrough.googleCalendarLink && (
                  <a href={walkthrough.googleCalendarLink} target="_blank" rel="noopener noreferrer" className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-indigo-600">
                    <LinkIcon />
                  </a>
              )}
          </div>
        </div>
    </div>
  );
};

export default EditableHomeWalkthrough;