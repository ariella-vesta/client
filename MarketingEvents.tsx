
import React from 'react';
import { MarketingEvent } from '../../../types';
import Card from '../../ui/Card';
import { MegaphoneIcon } from '../../ui/icons/MegaphoneIcon';

interface MarketingEventsProps {
  events: MarketingEvent[];
}

const MarketingEvents: React.FC<MarketingEventsProps> = ({ events }) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <Card title="Upcoming Marketing & Events" icon={<MegaphoneIcon />}>
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="p-3 bg-slate-50 rounded-lg">
            <p className="text-xs font-semibold text-indigo-600 mb-1">
              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <h4 className="font-semibold text-slate-800">{event.title}</h4>
            <p className="text-sm text-slate-600 mt-1">{event.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MarketingEvents;