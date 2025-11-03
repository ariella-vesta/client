
import React from 'react';
import { HomeWalkthrough } from '../../../types';
import Card from '../../ui/Card';
import { CalendarIcon } from '../../ui/icons/CalendarIcon';
import { GoogleCalendarIcon } from '../../ui/icons/GoogleCalendarIcon';

interface ClientHomeWalkthroughProps {
  walkthrough: HomeWalkthrough;
}

const ClientHomeWalkthrough: React.FC<ClientHomeWalkthroughProps> = ({ walkthrough }) => {
  return (
    <Card title="Step 3: Home Walkthrough" icon={<CalendarIcon />}>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-slate-500">Date & Time</p>
          <p className="font-semibold text-slate-800">{new Date(walkthrough.date).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
        </div>
        <div className="flex flex-col space-y-2 pt-2">
            {walkthrough.googleCalendarLink && (
                 <a href={walkthrough.googleCalendarLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                    <GoogleCalendarIcon /> <span className="ml-2">Add to Google Calendar</span>
                </a>
            )}
        </div>
      </div>
    </Card>
  );
};

export default ClientHomeWalkthrough;