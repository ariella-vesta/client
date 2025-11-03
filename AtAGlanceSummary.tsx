import React, { useMemo } from 'react';
import { ClientData } from '../../types';

interface AtAGlanceSummaryProps {
  clients: ClientData[];
}

const SummaryCard: React.FC<{ title: string, value: number, colorClass: string }> = ({ title, value, colorClass }) => (
    <div className={`p-4 rounded-lg ${colorClass}`}>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

const AtAGlanceSummary: React.FC<AtAGlanceSummaryProps> = ({ clients }) => {
  const summary = useMemo(() => {
    return clients.reduce((acc, client) => {
      if (client.clientType === 'Buyer') {
        acc.totalBuyers++;
      } else {
        acc.totalSellers++;
        if (client.clientPhase === 'Appointment') {
          acc.sellersInStrategy++;
        }
        if (client.clientPhase === 'Signed Client') {
          acc.sellersInPreList++;
        }
      }
      return acc;
    }, {
      totalBuyers: 0,
      totalSellers: 0,
      sellersInStrategy: 0,
      sellersInPreList: 0,
    });
  }, [clients]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">At a Glance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            <SummaryCard title="Total Buyers" value={summary.totalBuyers} colorClass="bg-sky-500" />
            <SummaryCard title="Total Sellers" value={summary.totalSellers} colorClass="bg-rose-500" />
            <SummaryCard title="Sellers in Strategy" value={summary.sellersInStrategy} colorClass="bg-purple-500" />
            <SummaryCard title="Sellers in Pre-List" value={summary.sellersInPreList} colorClass="bg-amber-500" />
        </div>
    </div>
  );
};

export default AtAGlanceSummary;