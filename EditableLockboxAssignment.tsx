
import React from 'react';
import { Lockbox } from '../../../types';
import Card from '../../ui/Card';
import { KeyIcon } from '../../ui/icons/KeyIcon';

interface EditableLockboxAssignmentProps {
  lockboxes: Lockbox[];
  assignedLockboxId?: string;
  onUpdate: (lockboxId: string) => void;
}

const EditableLockboxAssignment: React.FC<EditableLockboxAssignmentProps> = ({ lockboxes, assignedLockboxId, onUpdate }) => {
  
  const assignedLockbox = lockboxes.find(lb => lb.id === assignedLockboxId);

  return (
    <Card title="Lockbox Assignment" icon={<KeyIcon />}>
      <div className="space-y-2">
        <div>
          <label htmlFor="lockbox-select" className="block text-sm font-medium text-slate-700">Assign Lockbox to Property</label>
          <select
            id="lockbox-select"
            value={assignedLockboxId || ''}
            onChange={e => onUpdate(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">-- Select a Lockbox --</option>
            {lockboxes.map(lb => (
              <option key={lb.id} value={lb.id}>
                SN: {lb.serialNumber}
              </option>
            ))}
          </select>
        </div>
        {assignedLockbox && (
            <div className="p-3 bg-indigo-50 rounded-md text-sm">
                <p><span className="font-semibold">Serial #:</span> {assignedLockbox.serialNumber}</p>
                <p><span className="font-semibold">CBS Code:</span> {assignedLockbox.cbsCode}</p>
            </div>
        )}
      </div>
    </Card>
  );
};

export default EditableLockboxAssignment;