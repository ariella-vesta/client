
import React from 'react';
import { ListingTimelineEvent } from '../../../types';
import { CheckCircleIcon } from '../../ui/icons/CheckCircleIcon';
import { ClockIcon } from '../../ui/icons/ClockIcon';
import { ExclamationCircleIcon } from '../../ui/icons/ExclamationCircleIcon';
import { LinkIcon } from '../../ui/icons/LinkIcon';

interface ClientPreListingTimelineProps {
  events: ListingTimelineEvent[];
}

const statusStyles = {
  complete: {
    icon: <CheckCircleIcon className="text-green-500" />,
    borderColor: 'border-green-500',
  },
  current: {
    icon: <ExclamationCircleIcon className="text-blue-500" />,
    borderColor: 'border-blue-500',
  },
  upcoming: {
    icon: <ClockIcon className="text-slate-500" />,
    borderColor: 'border-slate-400',
  },
};

const ClientPreListingTimeline: React.FC<ClientPreListingTimelineProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-slate-800 tracking-wide mb-6">Timeline for Preparing for Market</h3>
      <div className="relative border-l-2 border-slate-200 ml-3">
        {sortedEvents.map((event) => {
          const styles = statusStyles[event.status];
          return (
            <div key={event.id} className="mb-8 ml-8 relative">
              <div className={`absolute -left-11 -top-1 flex items-center justify-center w-8 h-8 rounded-full bg-white`}>
                {styles.icon}
              </div>
              <div className={`p-4 rounded-lg bg-slate-50 border-l-4 ${styles.borderColor}`}>
                <time className="mb-1 text-sm font-normal leading-none text-slate-500">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</time>
                <h4 className="text-lg font-semibold text-slate-900">{event.title}</h4>
                {event.vendorFormUrl && (
                    <a
                        href={event.vendorFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        <LinkIcon />
                        <span className="ml-2">Complete Form</span>
                    </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientPreListingTimeline;