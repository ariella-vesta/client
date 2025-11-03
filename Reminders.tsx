
import React from 'react';
import Card from '../../ui/Card';
import { BellIcon } from '../../ui/icons/BellIcon';

const reminders = [
  {
    id: 'r1',
    title: 'File for Homestead Exemption',
    description: 'This can provide significant property tax savings. Check with your local county for deadlines and application procedures.',
  },
  {
    id: 'r2',
    title: 'Check Smoke & CO Detector Batteries',
    description: 'For your safety, it\'s recommended to test your detectors and change the batteries annually.',
  },
  {
    id: 'r3',
    title: 'Change HVAC / Furnace Filters',
    description: 'Regularly changing your filters improves air quality and system efficiency. We recommend checking them every 3 months.',
  },
];

const ClientReminders: React.FC = () => {
  return (
    <Card title="Important Reminders" icon={<BellIcon />}>
      <p className="mb-4 text-sm">A few tips to help you settle in and maintain your new home.</p>
      <div className="space-y-4">
        {reminders.map(reminder => (
          <div key={reminder.id} className="p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-slate-800">{reminder.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{reminder.description}</p>
                </div>
                <button
                  onClick={() => alert('Push notifications would be set up here!')}
                  title="Set Reminder"
                  className="ml-4 p-2 rounded-full hover:bg-indigo-100 text-indigo-500"
                >
                  <BellIcon />
                </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ClientReminders;