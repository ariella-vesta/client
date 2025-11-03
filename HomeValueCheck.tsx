
import React from 'react';
import Card from '../../ui/Card';
import { HomeIcon } from '../../ui/icons/HomeIcon';

const HomeValueCheck: React.FC = () => {
    
  const handleRequest = () => {
    alert("Request sent! Your agent will be in touch with an updated home value analysis.");
    // In a real app, this would trigger an email or notification to the agent.
  };

  return (
    <Card title="Curious About Your Home's Value?" icon={<HomeIcon />}>
      <p className="mb-4 text-sm">
        The market is always changing. If you're curious about your home's current value for any reason—refinancing, a potential move, or just for fun—let us know!
      </p>
      <button
        onClick={handleRequest}
        className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
      >
        Check My Home Value
      </button>
    </Card>
  );
};

export default HomeValueCheck;
