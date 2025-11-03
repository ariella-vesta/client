
import React from 'react';

interface BackendFeaturesProps {
    onNavigate: () => void;
}

const BackendFeatures: React.FC<BackendFeaturesProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-slate-800 tracking-wide">Company Settings & Templates</h3>
        <p className="mb-4 text-sm text-slate-500">Manage your company's branding, preferred vendors, and automated email communications from one place.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
                onClick={onNavigate}
                className="px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Manage Branding
            </button>
            <button
                onClick={onNavigate}
                className="px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Manage Vendor List
            </button>
            <button
                onClick={onNavigate}
                className="px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Edit Email Templates
            </button>
        </div>
    </div>
  );
};

export default BackendFeatures;