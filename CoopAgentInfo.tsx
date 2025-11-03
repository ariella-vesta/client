
import React from 'react';
import { CoopAgent, TransactionCoordinator } from '../../types';
import { IdentificationIcon } from '../ui/icons/IdentificationIcon';

interface EditableCoopAgentInfoProps {
  coopAgent: CoopAgent;
  transactionCoordinator?: TransactionCoordinator;
  onUpdate: (data: { coopAgent: CoopAgent; transactionCoordinator?: TransactionCoordinator }) => void;
  isReadOnly?: boolean;
}

const EditableCoopAgentInfo: React.FC<EditableCoopAgentInfoProps> = ({ coopAgent, transactionCoordinator, onUpdate, isReadOnly = false }) => {

  const handleCoopChange = (field: keyof CoopAgent, value: string) => {
    onUpdate({ coopAgent: { ...coopAgent, [field]: value }, transactionCoordinator });
  };

  const handleTcChange = (field: keyof TransactionCoordinator, value: string) => {
    if (transactionCoordinator) {
        onUpdate({ coopAgent, transactionCoordinator: { ...transactionCoordinator, [field]: value } });
    }
  };

  return (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800 tracking-wide flex items-center"><IdentificationIcon /><span className="ml-2">Co-operating Agent Info</span></h3>
        <div>
            <h4 className="font-semibold text-slate-700 mb-2">Co-op Agent</h4>
            <div className="space-y-2">
                <input type="text" placeholder="Name" value={coopAgent.name} onChange={e => handleCoopChange('name', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-2 border rounded-md disabled:bg-slate-100"/>
                <input type="text" placeholder="Brokerage" value={coopAgent.brokerage} onChange={e => handleCoopChange('brokerage', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-2 border rounded-md disabled:bg-slate-100"/>
                <input type="email" placeholder="Email" value={coopAgent.email} onChange={e => handleCoopChange('email', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-2 border rounded-md disabled:bg-slate-100"/>
                <input type="tel" placeholder="Phone" value={coopAgent.phone} onChange={e => handleCoopChange('phone', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-2 border rounded-md disabled:bg-slate-100"/>
            </div>
        </div>
        {transactionCoordinator && (
            <div>
                <h4 className="font-semibold text-slate-700 mb-2">Transaction Coordinator</h4>
                <div className="space-y-2">
                     <input type="text" placeholder="Name" value={transactionCoordinator.name} onChange={e => handleTcChange('name', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-2 border rounded-md disabled:bg-slate-100"/>
                     <input type="email" placeholder="Email" value={transactionCoordinator.email} onChange={e => handleTcChange('email', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-2 border rounded-md disabled:bg-slate-100"/>
                     <input type="tel" placeholder="Phone" value={transactionCoordinator.phone} onChange={e => handleTcChange('phone', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-2 border rounded-md disabled:bg-slate-100"/>
                </div>
            </div>
        )}
    </div>
  );
};

export default EditableCoopAgentInfo;