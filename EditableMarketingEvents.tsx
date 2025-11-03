
import React from 'react';
import { MarketingEvent } from '../../../types';
import Card from '../../ui/Card';
import { CloseIcon } from '../../ui/icons/CloseIcon';
import { MegaphoneIcon } from '../../ui/icons/MegaphoneIcon';

interface EditableMarketingEventsProps {
  events: MarketingEvent[];
  onUpdate: (updatedEvents: MarketingEvent[]) => void;
}

const EditableMarketingEvents: React.FC<EditableMarketingEventsProps> = ({ events, onUpdate }) => {

  const handleUpdate = (id: string, field: keyof MarketingEvent, value: string | Date) => {
    onUpdate(events.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleAdd = () => {
    const newEvent: MarketingEvent = {
      id: 'me' + Date.now(),
      title: 'New Event',
      date: new Date(),
      description: '',
    };
    onUpdate([...events, newEvent]);
  };

  const handleDelete = (id: string) => {
    onUpdate(events.filter(e => e.id !== id));
  };
  
  const toDateInput = (date: Date) => date.toISOString().split('T')[0];

  return (
    <Card title="Manage Upcoming Marketing & Events" icon={<MegaphoneIcon />}>
      <div className="space-y-3">
        {events.map(event => (
          <div key={event.id} className="p-3 border rounded-lg bg-slate-50 relative">
             <button onClick={() => handleDelete(event.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500"><CloseIcon /></button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                    type="text"
                    placeholder="Event Title"
                    value={event.title}
                    onChange={e => handleUpdate(event.id, 'title', e.target.value)}
                    className="md:col-span-2 w-full p-2 border rounded-md"
                />
                 <input
                    type="date"
                    value={toDateInput(new Date(event.date))}
                    onChange={e => handleUpdate(event.id, 'date', new Date(e.target.value))}
                    className="w-full p-2 border rounded-md"
                />
                <textarea
                    placeholder="Description"
                    value={event.description}
                    onChange={e => handleUpdate(event.id, 'description', e.target.value)}
                    className="md:col-span-3 w-full p-2 border rounded-md"
                    rows={2}
                />
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAdd} className="w-full mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors">
        + Add Event
      </button>
    </Card>
  );
};

export default EditableMarketingEvents;