
import React from 'react';
import { TimelineEvent } from '../../types';
import { CloseIcon } from '../ui/icons/CloseIcon';

interface EditableTimelineProps {
  events: TimelineEvent[];
  onUpdate: (updatedEvents: TimelineEvent[]) => void;
}

const EditableTimeline: React.FC<EditableTimelineProps> = ({ events, onUpdate }) => {
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());

  const handleEventChange = (id: string, field: keyof TimelineEvent, value: any) => {
    const updatedEvents = sortedEvents.map(event =>
      event.id === id ? { ...event, [field]: value } : event
    );
    onUpdate(updatedEvents);
  };
  
  const handleDateChange = (id: string, dateString: string) => {
      handleEventChange(id, 'date', new Date(dateString));
  };

  const handleAddEvent = () => {
    const newEvent: TimelineEvent = {
      id: 't' + Date.now(),
      date: new Date(),
      title: "New Event",
      description: "",
      videoUrl: "",
      status: 'upcoming'
    };
    onUpdate([...sortedEvents, newEvent]);
  };

  const handleDeleteEvent = (id: string) => {
    onUpdate(sortedEvents.filter(event => event.id !== id));
  };
  
  const toDateInput = (date: Date) => date.toISOString().split('T')[0];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md lg:col-span-3">
        <h3 className="text-xl font-semibold text-slate-800 tracking-wide mb-4">Manage Transaction Timeline</h3>
        <div className="space-y-3">
            {sortedEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded-lg flex flex-col md:flex-row gap-3 relative">
                     <button onClick={() => handleDeleteEvent(event.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500">
                        <CloseIcon />
                    </button>
                    <div className="flex-1 space-y-2">
                        <input type="text" placeholder="Title" value={event.title} onChange={e => handleEventChange(event.id, 'title', e.target.value)} className="w-full text-base font-semibold p-1 border-b"/>
                        <textarea placeholder="Description" value={event.description} onChange={e => handleEventChange(event.id, 'description', e.target.value)} className="w-full text-sm p-1 border-b" rows={1}/>
                        <input type="url" placeholder="Optional Video URL" value={event.videoUrl} onChange={e => handleEventChange(event.id, 'videoUrl', e.target.value)} className="w-full text-sm p-1 border-b"/>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-56">
                        <input type="date" value={toDateInput(event.date)} onChange={e => handleDateChange(event.id, e.target.value)} className="p-1 border rounded-md"/>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Time (e.g. 10am)" value={event.time} onChange={e => handleEventChange(event.id, 'time', e.target.value)} className="w-1/2 text-sm p-1 border rounded-md"/>
                            <input type="text" placeholder="Cont. End (e.g. 5pm)" value={event.contingencyEndTime} onChange={e => handleEventChange(event.id, 'contingencyEndTime', e.target.value)} className="w-1/2 text-sm p-1 border rounded-md"/>
                        </div>
                         <select 
                            value={event.status}
                            onChange={(e) => handleEventChange(event.id, 'status', e.target.value as any)}
                            className="capitalize block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="upcoming">Upcoming</option>
                            <option value="current">Current</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
        <button
            onClick={handleAddEvent}
            className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-md hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            + Add Timeline Event
        </button>
    </div>
  );
};

export default EditableTimeline;
