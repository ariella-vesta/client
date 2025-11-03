
import React from 'react';
import { PropertyInfo, UploadedFile } from '../../../types';
import { HomeIcon } from '../../ui/icons/HomeIcon';
import { UploadIcon } from '../../ui/icons/UploadIcon';
import { CloseIcon } from '../../ui/icons/CloseIcon';
import { LinkIcon } from '../../ui/icons/LinkIcon';

interface EditablePropertyInfoProps {
  propertyInfo: PropertyInfo;
  onUpdate: (updatedInfo: PropertyInfo) => void;
  isReadOnly?: boolean;
}

const EditablePropertyInfo: React.FC<EditablePropertyInfoProps> = ({ propertyInfo, onUpdate, isReadOnly = false }) => {

  const handleChange = (field: keyof PropertyInfo, value: string) => {
    onUpdate({ ...propertyInfo, [field]: value });
  };

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      onUpdate({ ...propertyInfo, additionalPhotos: [...propertyInfo.additionalPhotos, ...newFiles]});
    }
  };

  const handleDeletePhoto = (url: string) => {
    onUpdate({ ...propertyInfo, additionalPhotos: propertyInfo.additionalPhotos.filter(p => p.url !== url) });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-slate-800 tracking-wide flex items-center mb-4"><HomeIcon /><span className="ml-2">Property Information</span></h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-slate-700">Property Address</label>
          <input
            type="text"
            id="address"
            value={propertyInfo.address}
            onChange={e => handleChange('address', e.target.value)}
            disabled={isReadOnly}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="primary-photo" className="block text-sm font-medium text-slate-700">Primary Photo URL</label>
          <div className="relative mt-1">
            <input
              type="url"
              id="primary-photo"
              value={propertyInfo.primaryPhotoUrl}
              onChange={e => handleChange('primaryPhotoUrl', e.target.value)}
              disabled={isReadOnly}
              className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
            {propertyInfo.primaryPhotoUrl && (
                <a href={propertyInfo.primaryPhotoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-indigo-600">
                    <LinkIcon />
                </a>
            )}
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="walkthrough-notes" className="block text-sm font-medium text-slate-700">Property Notes (from walkthrough)</label>
          <textarea
            id="walkthrough-notes"
            rows={4}
            value={propertyInfo.walkthroughNotes}
            onChange={e => handleChange('walkthroughNotes', e.target.value)}
            disabled={isReadOnly}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Additional Property Photos</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {propertyInfo.additionalPhotos.map((photo, index) => (
              <div key={index} className="relative">
                <img src={photo.url} alt={`Property photo ${index + 1}`} className="h-24 w-24 object-cover rounded-md"/>
                {!isReadOnly && (
                  <button onClick={() => handleDeletePhoto(photo.url)} className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 text-rose-500 shadow-md">
                      <CloseIcon />
                  </button>
                )}
              </div>
            ))}
          </div>
          {!isReadOnly && (
            <>
              <label htmlFor="photo-upload" className="mt-4 cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-100 border border-slate-300">
                <UploadIcon className="h-4 w-4 mr-2" /> Upload Photos
              </label>
              <input type="file" id="photo-upload" multiple className="sr-only" onChange={e => handleFileChange(e.target.files)} accept="image/*"/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditablePropertyInfo;