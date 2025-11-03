
import React from 'react';
import { ActivityItem } from '../../types';
import Modal from '../ui/Modal';

interface NotificationFeedProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityItem[];
}

const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}


const NotificationFeed: React.FC<NotificationFeedProps> = ({ isOpen, onClose, activities }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Recent Activity">
      <div className="max-h-96 overflow-y-auto">
        {activities.length > 0 ? (
          <ul className="divide-y divide-slate-200">
            {activities.map(activity => (
              <li key={activity.id} className="p-4 hover:bg-slate-50">
                <p className="text-sm text-slate-700">{activity.text}</p>
                <p className="text-xs text-slate-400 mt-1">{timeSince(activity.timestamp)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-slate-500 py-8">No new notifications.</p>
        )}
      </div>
    </Modal>
  );
};

export default NotificationFeed;