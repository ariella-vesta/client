
import React from 'react';
import { ListingDetails } from '../../../types';
import { DocumentTextIcon } from '../../ui/icons/DocumentTextIcon';
import { LinkIcon } from '../../ui/icons/LinkIcon';

interface EditableListingDetailsProps {
  listingDetails: ListingDetails;
  onUpdate: (updatedDetails: ListingDetails) => void;
  isReadOnly?: boolean;
}

const EditableListingDetails: React.FC<EditableListingDetailsProps> = ({ listingDetails, onUpdate, isReadOnly = false }) => {

  const handleChange = (field: keyof ListingDetails, value: string) => {
    onUpdate({ ...listingDetails, [field]: value });
  };

  const InputField: React.FC<{label: string, id: keyof ListingDetails, value: string, placeholder?: string, isTextArea?: boolean}> = ({label, id, value, placeholder, isTextArea}) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        {isTextArea ? (
            <textarea
                id={id}
                rows={4}
                value={value}
                onChange={e => handleChange(id, e.target.value)}
                disabled={isReadOnly}
                placeholder={placeholder}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
        ) : (
             <div className="relative mt-1">
                <input
                    type="url"
                    id={id}
                    value={value}
                    onChange={e => handleChange(id, e.target.value)}
                    disabled={isReadOnly}
                    placeholder={placeholder}
                    className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
                {value && (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-indigo-600">
                        <LinkIcon />
                    </a>
                )}
            </div>
        )}
     </div>
  );

  return (
    <div>
        <h3 className="text-xl font-semibold text-slate-800 tracking-wide flex items-center mb-4"><DocumentTextIcon /><span className="ml-2">Listing Details & Media</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <InputField label="Public MLS Remarks" id="publicRemarks" value={listingDetails.publicRemarks} isTextArea />
            </div>
             <div className="md:col-span-2">
                <InputField label="Private MLS Remarks" id="privateRemarks" value={listingDetails.privateRemarks} isTextArea />
            </div>
            <InputField label="Google Drive Link (Docs)" id="googleDriveLink" value={listingDetails.googleDriveLink} placeholder="https://drive.google.com/..." />
            <InputField label="Photo Gallery Link" id="photoGalleryLink" value={listingDetails.photoGalleryLink} placeholder="https://photos.google.com/..." />
            <InputField label="Video / Media Link" id="videoMediaLink" value={listingDetails.videoMediaLink} placeholder="https://youtube.com/..." />
        </div>
    </div>
  );
};

export default EditableListingDetails;