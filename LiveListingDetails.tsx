
import React from 'react';
import { ListingPerformance } from '../../../types';
import Card from '../../ui/Card';
import { LinkIcon } from '../../ui/icons/LinkIcon';

interface LiveListingDetailsProps {
  performance: ListingPerformance;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
};

const LiveListingDetails: React.FC<LiveListingDetailsProps> = ({ performance }) => {
  return (
    <Card title="Your Live Listing">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
                <p className="text-4xl font-bold text-indigo-600">{formatCurrency(performance.price)}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span><strong>{performance.bedrooms}</strong> beds</span>
                    <span><strong>{performance.bathrooms}</strong> baths</span>
                    <span><strong>{performance.sqft.toLocaleString()}</strong> sqft</span>
                    <span>Built in <strong>{performance.yearBuilt}</strong></span>
                </div>
            </div>
             <a href={performance.listingUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors">
              <LinkIcon /> <span className="ml-2">View on MLS</span>
            </a>
        </div>
        <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-slate-800">Listing Remarks</h4>
            <p className="mt-1 text-sm text-slate-600 p-3 bg-slate-50 rounded-md italic">
                "{performance.remarks}"
            </p>
        </div>
    </Card>
  );
};

export default LiveListingDetails;