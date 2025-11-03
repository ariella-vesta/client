import React from 'react';
import BrandingSettings from './settings/BrandingSettings';
import VendorListSettings from './settings/VendorListSettings';
import EmailTemplatesSettings from './settings/EmailTemplatesSettings';
import { ArrowLeftIcon } from './ui/icons/ArrowLeftIcon';
import LockboxSettings from './settings/LockboxSettings';
import { InvitationTemplates, ListingPaperworkTemplate } from '../types';
import InvitationTemplateSettings from './settings/InvitationTemplateSettings';
import ListingPaperworkSettings from './settings/ListingPaperworkSettings';

interface SettingsPageProps {
  setView: (view: 'admin' | 'client' | 'settings') => void;
  invitationTemplates: InvitationTemplates;
  onUpdateInvitationTemplates: (templates: InvitationTemplates) => void;
  masterPaperwork: ListingPaperworkTemplate[];
  onUpdateMasterPaperwork: (templates: ListingPaperworkTemplate[]) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ 
  setView, 
  invitationTemplates, 
  onUpdateInvitationTemplates,
  masterPaperwork,
  onUpdateMasterPaperwork
}) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <button 
          onClick={() => setView('admin')} 
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-4"
        >
          <ArrowLeftIcon />
          <span className="ml-2">Back to Admin Dashboard</span>
        </button>
        <h1 className="text-3xl font-bold text-slate-900">Company Settings</h1>
        <p className="mt-1 text-lg text-slate-600">Customize your client portal experience.</p>
      </div>

      <div className="space-y-8">
        <BrandingSettings />
        <VendorListSettings />
        <LockboxSettings />
        <ListingPaperworkSettings 
          templates={masterPaperwork}
          onUpdate={onUpdateMasterPaperwork}
        />
        <InvitationTemplateSettings 
          templates={invitationTemplates}
          onUpdate={onUpdateInvitationTemplates}
        />
        <EmailTemplatesSettings />
      </div>
    </div>
  );
};

export default SettingsPage;