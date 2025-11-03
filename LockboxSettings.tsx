
import React, { useState } from 'react';
import { Lockbox } from '../../types';
import Card from '../ui/Card';
import { CloseIcon } from '../ui/icons/CloseIcon';
import { KeyIcon } from '../ui/icons/KeyIcon';
import { mockLockboxes } from '../../services/mockData';

const LockboxSettings: React.FC = () => {
  const [lockboxes, setLockboxes] = useState<Lockbox[]>(mockLockboxes);

  const handleUpdate = (id: string, field: keyof Lockbox, value: string) => {
    setLockboxes(lockboxes.map(lb => lb.id === id ? { ...lb, [field]: value } : lb));
  };

  const handleAdd = () => {
    const newLockbox: Lockbox = { id: 'lb' + Date.now(), serialNumber: '', cbsCode: '' };
    setLockboxes([...lockboxes, newLockbox]);
  };

  const handleDelete = (id: string) => {
    setLockboxes(lockboxes.filter(lb => lb.id !== id));
  };

  const handleSave = () => {
    alert('Lockbox inventory saved! (Check console for output)');
    console.log('Saving lockboxes:', lockboxes);
  };

  return (
    <Card title="Manage Lockboxes" icon={<KeyIcon />}>
      <div className="space-y-3">
        {lockboxes.map(lockbox => (
          <div key={lockbox.id} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center p-2 border rounded-lg bg-slate-50 relative">
            <div className="sm:col-span-2">
                <input
                    type="text"
                    placeholder="Serial Number"
                    value={lockbox.serialNumber}
                    onChange={e => handleUpdate(lockbox.id, 'serialNumber', e.target.value)}
                    className="w-full text-sm p-2 border rounded-md"
                />
            </div>
             <div className="sm:col-span-2">
                <input
                    type="text"
                    placeholder="CBS Code"
                    value={lockbox.cbsCode}
                    onChange={e => handleUpdate(lockbox.id, 'cbsCode', e.target.value)}
                    className="w-full text-sm p-2 border rounded-md"
                />
            </div>
            <div className="sm:col-span-1 flex justify-end">
                 <button onClick={() => handleDelete(lockbox.id)} className="p-1 rounded-full hover:bg-rose-100 text-rose-500">
                    <CloseIcon />
                </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAdd} className="w-full mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200">
        + Add Lockbox
      </button>
      <div className="mt-6 text-right">
        <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700">
          Save Lockboxes
        </button>
      </div>
    </Card>
  );
};

export default LockboxSettings;
