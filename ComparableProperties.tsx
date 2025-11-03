
import React from 'react';
import { ComparableProperty } from '../../../types';
import Card from '../../ui/Card';
import { LinkIcon } from '../../ui/icons/LinkIcon';

interface ComparablePropertiesProps {
  properties: ComparableProperty[];
  compsPortalUrl?: string;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
};

const statusColors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Sold': 'bg-gray-100 text-gray-800',
}

const ComparableProperties: React.FC<ComparablePropertiesProps> = ({ properties, compsPortalUrl }) => {
  return (
    <Card title="Comparable Properties on Market">
      <div className="space-y-3">
        {properties.map(prop => (
          <div key={prop.id} className="p-3 bg-slate-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-slate-800">{prop.address}</p>
                <p className="text-lg font-bold text-indigo-600">{formatCurrency(prop.price)}</p>
              </div>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[prop.status]}`}>
                {prop.status}
              </span>
            </div>
            <a href={prop.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:underline text-sm mt-2">
              View Listing <LinkIcon />
            </a>
          </div>
        ))}
      </div>
      {compsPortalUrl && (
         <a 
            href={compsPortalUrl}
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 w-full block text-center px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-md hover:bg-indigo-200 transition-colors"
        >
            View Full Comps Portal
        </a>
      )}
    </Card>
  );
};

export default ComparableProperties;