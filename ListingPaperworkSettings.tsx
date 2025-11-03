import React from 'react';
import { ListingPaperworkTemplate, UploadedFile } from '../../types';
import Card from '../ui/Card';
import { CloseIcon } from '../ui/icons/CloseIcon';
import { DocumentTextIcon } from '../ui/icons/DocumentTextIcon';
import { UploadIcon } from '../ui/icons/UploadIcon';

interface ListingPaperworkSettingsProps {
  templates: ListingPaperworkTemplate[];
  onUpdate: (updatedTemplates: ListingPaperworkTemplate[]) => void;
}

const ListingPaperworkSettings: React.FC<ListingPaperworkSettingsProps> = ({ templates, onUpdate }) => {
  
  const handleUpdate = (id: string, field: keyof ListingPaperworkTemplate, value: string | UploadedFile) => {
    onUpdate(templates.map(doc => doc.id === id ? { ...doc, [field]: value } : doc));
  };

  const handleFileChange = (id: string, file: File | null) => {
    if (file) {
        const newFile: UploadedFile = { name: file.name, url: URL.createObjectURL(file) };
        handleUpdate(id, 'previewFile', newFile);
    }
  };

  const handleAdd = () => {
    const newDoc: ListingPaperworkTemplate = {
      id: 'm-lp' + Date.now(),
      title: 'New Document Template',
      description: '',
      videoUrl: '',
    };
    onUpdate([...templates, newDoc]);
  };

  const handleDelete = (id: string) => {
    onUpdate(templates.filter(doc => doc.id !== id));
  };
  
  const handleSave = () => {
    alert("Listing paperwork templates saved!");
  };

  return (
    <Card title="Manage Listing Paperwork Templates" icon={<DocumentTextIcon />}>
       <p className="text-sm text-slate-500 mb-4">
        Create a master list of documents you can add to a seller's portal.
      </p>
      <div className="space-y-4">
        {templates.map(doc => (
          <div key={doc.id} className="p-3 border rounded-lg space-y-2 relative bg-slate-50">
            <button onClick={() => handleDelete(doc.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500">
              <CloseIcon />
            </button>
            <input type="text" placeholder="Title" value={doc.title} onChange={e => handleUpdate(doc.id, 'title', e.target.value)} className="w-full text-base font-semibold p-1 border-b"/>
            <textarea placeholder="Description" value={doc.description} onChange={e => handleUpdate(doc.id, 'description', e.target.value)} className="w-full text-sm p-1 border-b" rows={2}/>
            <input type="url" placeholder="Video URL" value={doc.videoUrl} onChange={e => handleUpdate(doc.id, 'videoUrl', e.target.value)} className="w-full text-sm p-1 border-b"/>
            <div>
                <label htmlFor={`template-file-${doc.id}`} className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-100 border border-slate-300">
                    <UploadIcon className="h-4 w-4 mr-2" /> 
                    {doc.previewFile ? `Change File: ${doc.previewFile.name}` : 'Upload Preview File'}
                </label>
                <input type="file" id={`template-file-${doc.id}`} className="sr-only" onChange={e => handleFileChange(doc.id, e.target.files ? e.target.files[0] : null)} />
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAdd} className="w-full mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors">
        + Add Paperwork Template
      </button>
      <div className="mt-6 text-right">
        <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700">
          Save Paperwork Templates
        </button>
      </div>
    </Card>
  );
};

export default ListingPaperworkSettings;