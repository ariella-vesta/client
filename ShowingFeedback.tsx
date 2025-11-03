
import React from 'react';
import { Showing } from '../../../types';
import Card from '../../ui/Card';
import { PresentationChartBarIcon } from '../../ui/icons/PresentationChartBarIcon';

interface ShowingFeedbackProps {
  showings: Showing[];
}

const ShowingFeedback: React.FC<ShowingFeedbackProps> = ({ showings }) => {
  return (
    <Card title="Showings & Feedback" icon={<PresentationChartBarIcon />}>
        <div className="mb-4 flex items-baseline gap-4">
            <h4 className="font-semibold text-slate-700">Total Showings:</h4>
            <p className="text-3xl font-bold text-indigo-600">{showings.length}</p>
        </div>
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {showings.map(showing => (
                <div key={showing.id} className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs font-semibold text-slate-500 mb-1">{new Date(showing.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    <p className="text-sm text-slate-700 italic">"{showing.feedback}"</p>
                </div>
            ))}
        </div>
    </Card>
  );
};

export default ShowingFeedback;