
import React from 'react';
import { PropertyDetails } from '../../../types';
import Card from '../../ui/Card';
import { CurrencyDollarIcon } from '../../ui/icons/CurrencyDollarIcon';

const ContractDetails: React.FC<{ property: PropertyDetails }> = ({ property }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card title="Key Contract Details" icon={<CurrencyDollarIcon />}>
      <div className="space-y-4">
        {property.imageUrl && (
            <img src={property.imageUrl} alt={`View of ${property.address}`} className="w-full h-48 object-cover rounded-md" />
        )}
        <div>
            <p className="font-bold text-slate-800 text-lg">{property.address}</p>
        </div>
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-md">
            <div>
                <p className="text-sm font-medium text-slate-500">Purchase Price</p>
                <p className="font-bold text-indigo-600 text-xl">{formatCurrency(property.purchasePrice)}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">Est. Closing Costs</p>
                <p className="font-semibold text-slate-700 text-lg">{formatCurrency(property.closingCosts)}</p>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default ContractDetails;