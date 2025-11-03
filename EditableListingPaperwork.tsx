import React, { useState } from 'react';
import { ListingPaperwork, UploadedFile, ListingPaperworkTemplate } from '../../../types';
import Card from '../../ui/Card';
import Modal from '../../ui/Modal';
import { CloseIcon } from '../../ui/icons/CloseIcon';
import { LightBulbIcon } from '../../ui/icons/LightBulbIcon';
import { UploadIcon } from '../../ui/icons/UploadIcon';

interface EditableListingPaperworkProps {
  documents: ListingPaperwork[];
  onUpdate: (updatedDocs: ListingPaperwork[]) => void;
  masterTemplates: ListingPaperworkTemplate[];
}

const EditableListingPaperwork: React.FC<EditableListingPaperworkProps> = ({ documents, onUpdate, masterTemplates }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = (id: string, field: keyof ListingPaperwork, value: string | UploadedFile) => {
    onUpdate(documents.map(doc => doc.id === id ? { ...doc, [field]: value } : doc));
  };

  const handleFileChange = (id: string, file: File | null) => {
    if (file) {
        const newFile: UploadedFile = { name: file.name, url: URL.createObjectURL(file) };
        handleUpdate(id, 'previewFile', newFile);
    }
  };

  const handleAddFromTemplates = (selectedTemplates: ListingPaperworkTemplate[]) => {
      const newDocs: ListingPaperwork[] = selectedTemplates.map(t => ({
          id: 'lp' + Date.now() + Math.random(),
          title: t.title,
          description: t.description,
          videoUrl: t.videoUrl,
          previewFile: t.previewFile,
      }));
      onUpdate([...documents, ...newDocs]);
      setIsModalOpen(false);
  }

  const handleDelete = (id: string) => {
    onUpdate(documents.filter(doc => doc.id !== id));
  };

  return (
    <>
    <Card title="Manage Listing Paperwork" icon={<LightBulbIcon />}>
       <p className="text-sm text-slate-500 mb-4">
        Customize the list of initial documents the seller needs to review and understand.
      </p>
      <div className="space-y-4">
        {documents.map(doc => (
          <div key={doc.id} className="p-3 border rounded-lg space-y-2 relative bg-slate-50">
            <button onClick={() => handleDelete(doc.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500">
              <CloseIcon />
            </button>
            <input type="text" placeholder="Title" value={doc.title} onChange={e => handleUpdate(doc.id, 'title', e.target.value)} className="w-full text-base font-semibold p-1 border-b"/>
            <textarea placeholder="Description" value={doc.description} onChange={e => handleUpdate(doc.id, 'description', e.target.value)} className="w-full text-sm p-1 border-b" rows={2}/>
            <input type="url" placeholder="Video URL" value={doc.videoUrl} onChange={e => handleUpdate(doc.id, 'videoUrl', e.target.value)} className="w-full text-sm p-1 border-b"/>
            <div>
                <label htmlFor={`file-${doc.id}`} className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-100 border border-slate-300">
                    <UploadIcon className="h-4 w-4 mr-2" /> 
                    {doc.previewFile ? `Change File: ${doc.previewFile.name}` : 'Upload Preview File'}
                </label>
                <input type="file" id={`file-${doc.id}`} className="sr-only" onChange={e => handleFileChange(doc.id, e.target.files ? e.target.files[0] : null)} />
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setIsModalOpen(true)} className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-md hover:bg-indigo-200 transition-colors">
        + Add from Templates
      </button>
    </Card>
    <TemplateSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        templates={masterTemplates}
        onAdd={handleAddFromTemplates}
    />
    </>
  );
};

const TemplateSelectionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  templates: ListingPaperworkTemplate[];
  onAdd: (selected: ListingPaperworkTemplate[]) => void;
}> = ({ isOpen, onClose, templates, onAdd }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleSelect = (templateId: string) => {
    const newSelection = new Set(selected);
    if (newSelection.has(templateId)) {
      newSelection.delete(templateId);
    } else {
      newSelection.add(templateId);
    }
    setSelected(newSelection);
  };
  
  const handleSubmit = () => {
    const selectedTemplates = templates.filter(t => selected.has(t.id));
    onAdd(selectedTemplates);
    setSelected(new Set());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Paperwork from Templates">
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-slate-200">
          {templates.map(template => (
            <li key={template.id} className="p-3 flex items-center justify-between hover:bg-slate-50">
              <p className="font-semibold text-slate-800">{template.title}</p>
              <input
                type="checkbox"
                checked={selected.has(template.id)}
                onChange={() => handleSelect(template.id)}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={selected.size === 0}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Add {selected.size > 0 ? selected.size : ''} Document{selected.size !== 1 && 's'}
        </button>
      </div>
    </Modal>
  );
};


export default EditableListingPaperwork;