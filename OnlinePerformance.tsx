
import React from 'react';
import { ListingPerformance } from '../../../types';
import Card from '../../ui/Card';
import { PresentationChartBarIcon } from '../../ui/icons/PresentationChartBarIcon';

interface OnlinePerformanceProps {
  totalViews: ListingPerformance['totalViews'];
}

const OnlinePerformance: React.FC<OnlinePerformanceProps> = ({ totalViews }) => {
  const total = Object.values(totalViews).reduce((sum, val) => sum + val, 0);

  const viewSources = [
    { name: 'Zillow', value: totalViews.zillow },
    { name: 'Redfin', value: totalViews.redfin },
    { name: 'Realtor.com', value: totalViews.realtor },
    { name: 'Homes.com', value: totalViews.homes },
  ];

  return (
    <Card title="Online Performance" icon={<PresentationChartBarIcon />}>
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-slate-500">Total Online Views</p>
        <p className="text-5xl font-bold text-indigo-600 tracking-tight">{total.toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {viewSources.map(source => (
          <div key={source.name} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded">
            <span className="font-semibold text-slate-700">{source.name}</span>
            <span className="font-bold text-slate-900">{source.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OnlinePerformance;
