
import React from 'react';
import Card from '../ui/Card';
import { HeartIcon } from '../ui/icons/HeartIcon';

interface EditableClientMotivationProps {
  motivation: string;
  onUpdate: (motivation: string) => void;
}

const EditableClientMotivation: React.FC<EditableClientMotivationProps> = ({ motivation, onUpdate }) => {
  return (
    <Card title="Client's 'Why' / Motivation" icon={<HeartIcon />}>
      <p className="text-sm text-slate-500 mb-2">
        Capture the core reasons behind the client's move to keep their goals top-of-mind.
      </p>
      <textarea
        rows={5}
        value={motivation}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="e.g., Moving to be closer to family, need a bigger yard for the dogs..."
        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </Card>
  );
};

export default EditableClientMotivation;