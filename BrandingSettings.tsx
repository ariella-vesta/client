
import React, { useState } from 'react';
import Card from '../ui/Card';
import { UploadIcon } from '../ui/icons/UploadIcon';

const BrandingSettings: React.FC = () => {
  const [branding, setBranding] = useState({
    logoFile: null as File | null,
    agentPhotoFile: null as File | null,
    primaryColor: '#4f46e5',
    subtextColor: '#64748b',
    font: 'Inter',
    companyWebsite: '',
  });

  const handleChange = (field: keyof typeof branding, value: any) => {
    setBranding(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: 'logoFile' | 'agentPhotoFile', file: File | null) => {
    if (file) {
      handleChange(field, file);
    }
  };
  
  const handleSave = () => {
    alert('Branding settings saved! (Check console for output)');
    console.log('Saving branding:', branding);
  };

  const FileInput: React.FC<{label: string, file: File | null, onChange: (file: File | null) => void}> = ({label, file, onChange}) => (
      <div>
          <label className="block text-sm font-medium text-slate-700">{label}</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-slate-400"/>
                  <div className="flex text-sm text-slate-600">
                      <label htmlFor={label} className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <input id={label} name={label} type="file" className="sr-only" onChange={e => onChange(e.target.files ? e.target.files[0] : null)} accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                  </div>
                  {file ? (
                    <p className="text-xs text-slate-500">Selected: {file.name}</p>
                  ) : (
                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                  )}
              </div>
          </div>
      </div>
  );

  return (
    <Card title="Manage Branding">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileInput label="Company Logo" file={branding.logoFile} onChange={(file) => handleFileChange('logoFile', file)} />
        <FileInput label="Agent Photo" file={branding.agentPhotoFile} onChange={(file) => handleFileChange('agentPhotoFile', file)} />
        <div>
          <label htmlFor="primary-color" className="block text-sm font-medium text-slate-700">Primary Color</label>
          <input
            type="color"
            id="primary-color"
            value={branding.primaryColor}
            onChange={(e) => handleChange('primaryColor', e.target.value)}
            className="mt-1 block w-full h-10 px-1 py-1 bg-white border border-slate-300 rounded-md shadow-sm"
          />
        </div>
         <div>
          <label htmlFor="subtext-color" className="block text-sm font-medium text-slate-700">Subtext Color</label>
          <input
            type="color"
            id="subtext-color"
            value={branding.subtextColor}
            onChange={(e) => handleChange('subtextColor', e.target.value)}
            className="mt-1 block w-full h-10 px-1 py-1 bg-white border border-slate-300 rounded-md shadow-sm"
          />
        </div>
         <div>
          <label htmlFor="company-website" className="block text-sm font-medium text-slate-700">Company Website URL</label>
          <input
            type="text"
            id="company-website"
            value={branding.companyWebsite}
            onChange={(e) => handleChange('companyWebsite', e.target.value)}
            placeholder="https://www.yourrealty.com"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="font" className="block text-sm font-medium text-slate-700">Font Family</label>
          <select
            id="font"
            value={branding.font}
            onChange={(e) => handleChange('font', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>Inter</option>
            <option>Roboto</option>
            <option>Lato</option>
            <option>Montserrat</option>
          </select>
        </div>
      </div>
       <div className="mt-6 text-right">
        <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
        >
            Save Branding
        </button>
      </div>
    </Card>
  );
};

export default BrandingSettings;