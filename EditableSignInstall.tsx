
import React from 'react';
import { Vendor } from '../../../types';
import Card from '../../ui/Card';

interface EditableSignInstallProps {
  signInstallerInfo: {
    vendorId?: string;
    formUrl?: string;
  };
  vendors: Vendor[];
  onUpdate: (updatedInfo: { vendorId?: string; formUrl?: string }) => void;
}

const EditableSignInstall: React.FC<EditableSignInstallProps> = ({ signInstallerInfo, vendors, onUpdate }) => {
  
  const signInstallers = vendors.filter(v => v.service.toLowerCase().includes('sign'));

  const handleChange = (field: 'vendorId' | 'formUrl', value: string) => {
    onUpdate({ ...signInstallerInfo, [field]: value });
  };

  return (
    <Card title="Sign Installation">
      <div className="space-y-4">
        <div>
          <label htmlFor="sign-vendor" className="block text-sm font-medium text-slate-700">Sign Installer Vendor</label>
          <select
            id="sign-vendor"
            value={signInstallerInfo.vendorId || ''}
            onChange={e => handleChange('vendorId', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">-- Select Installer --</option>
            {signInstallers.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sign-form-url" className="block text-sm font-medium text-slate-700">Order Form URL</label>
          <input
            type="url"
            id="sign-form-url"
            value={signInstallerInfo.formUrl || ''}
            onChange={e => handleChange('formUrl', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://signcompany.com/order"
          />
        </div>
      </div>
    </Card>
  );
};

export default EditableSignInstall;
