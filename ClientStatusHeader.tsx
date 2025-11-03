
import React from 'react';
import { GlobeAltIcon } from '../ui/icons/GlobeAltIcon';
import { EmailIcon } from '../ui/icons/EmailIcon';
import { PhoneIcon } from '../ui/icons/PhoneIcon';
import { LinkIcon } from '../ui/icons/LinkIcon';

interface ClientStatusHeaderProps {
  crmLink: string;
  clientEmails: string[];
  clientPhones: string[];
  onUpdate: (updates: {
    crmLink: string;
    clientEmails: string[];
    clientPhones: string[];
  }) => void;
  isReadOnly?: boolean;
}

const InputField: React.FC<{id: string, value: string, onChange: (val: string) => void, placeholder: string, type: string, icon: React.ReactNode, isReadOnly: boolean, isUrl?: boolean}> = ({id, value, onChange, placeholder, type, icon, isReadOnly, isUrl = false}) => (
    <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
        </div>
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isReadOnly}
          className="block w-full rounded-md border-slate-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 disabled:bg-slate-100 disabled:cursor-not-allowed"
          placeholder={placeholder}
        />
        {isUrl && value && (
            <a href={value} target="_blank" rel="noopener noreferrer" className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-indigo-600">
                <LinkIcon />
            </a>
        )}
    </div>
);


const ClientStatusHeader: React.FC<ClientStatusHeaderProps> = ({ crmLink, clientEmails, clientPhones, onUpdate, isReadOnly = false }) => {
  
  const handleFieldChange = (field: 'crmLink' | 'clientEmails' | 'clientPhones', value: string, index?: number) => {
      let newEmails = [...clientEmails];
      let newPhones = [...clientPhones];

      if (field === 'clientEmails' && index !== undefined) newEmails[index] = value;
      if (field === 'clientPhones' && index !== undefined) newPhones[index] = value;
      
      onUpdate({
          crmLink: field === 'crmLink' ? value : crmLink,
          clientEmails: newEmails,
          clientPhones: newPhones
      });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 tracking-wide mb-4">Client Status & Quick Links</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Column 1 */}
        <div className="space-y-2">
            <div>
                <label htmlFor="email1" className="block text-xs font-medium text-slate-600 mb-1">Primary Email</label>
                <InputField id="email1" type="email" placeholder="Primary Email" value={clientEmails[0] || ''} onChange={(val) => handleFieldChange('clientEmails', val, 0)} icon={<EmailIcon />} isReadOnly={isReadOnly}/>
            </div>
            <div>
                <label htmlFor="email2" className="block text-xs font-medium text-slate-600 mb-1">Secondary Email</label>
                <InputField id="email2" type="email" placeholder="Secondary Email" value={clientEmails[1] || ''} onChange={(e) => handleFieldChange('clientEmails', e, 1)} icon={<EmailIcon />} isReadOnly={isReadOnly}/>
            </div>
        </div>
        
        {/* Column 2 */}
        <div className="space-y-2">
             <div>
                <label htmlFor="phone1" className="block text-xs font-medium text-slate-600 mb-1">Primary Phone</label>
                <InputField id="phone1" type="tel" placeholder="Primary Phone" value={clientPhones[0] || ''} onChange={(val) => handleFieldChange('clientPhones', val, 0)} icon={<PhoneIcon />} isReadOnly={isReadOnly}/>
            </div>
            <div>
                <label htmlFor="phone2" className="block text-xs font-medium text-slate-600 mb-1">Secondary Phone</label>
                <InputField id="phone2" type="tel" placeholder="Secondary Phone" value={clientPhones[1] || ''} onChange={(e) => handleFieldChange('clientPhones', e, 1)} icon={<PhoneIcon />} isReadOnly={isReadOnly}/>
            </div>
        </div>
        
        {/* Column 3 */}
        <div className="space-y-2">
            <div>
                <label htmlFor="crm-link" className="block text-xs font-medium text-slate-600 mb-1">CRM Link</label>
                <InputField id="crm-link" type="url" placeholder="Follow Up Boss URL" value={crmLink} onChange={(val) => handleFieldChange('crmLink', val)} icon={<GlobeAltIcon />} isReadOnly={isReadOnly} isUrl={true}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientStatusHeader;