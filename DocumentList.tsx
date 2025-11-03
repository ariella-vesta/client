
import React from 'react';
import { BuyerDocument, UploadedFile } from '../../types';
import { CloseIcon } from '../ui/icons/CloseIcon';
import { UploadIcon } from '../ui/icons/UploadIcon';
import { DocumentTextIcon } from '../ui/icons/DocumentTextIcon';

interface EditableDocumentListProps {
  documents: BuyerDocument[];
  onUpdate: (updatedDocuments: BuyerDocument[]) => void;
  isReadOnly?: boolean;
}

const EditableDocumentList: React.FC<EditableDocumentListProps> = ({ documents, onUpdate, isReadOnly = false }) => {

  const handleUpdate = (id: string, updatedDoc: Partial<BuyerDocument>) => {
    onUpdate(documents.map(doc => doc.id === id ? { ...doc, ...updatedDoc } : doc));
  };

  const handleFileChange = (id: string, file: File | null) => {
    if (file) {
      const newFile: UploadedFile = {
        name: file.name,
        url: URL.createObjectURL(file), 
      };
      handleUpdate(id, { file: newFile });
    }
  };
  
  const handleAddDoc = () => {
    const newDoc: BuyerDocument = {
        id: 'doc' + Date.now(),
        title: 'New Amendment',
    };
    onUpdate([...documents, newDoc]);
  };
  
  const handleDeleteDoc = (id: string) => {
      onUpdate(documents.filter(doc => doc.id !== id));
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-slate-800 tracking-wide flex items-center"><DocumentTextIcon /><span className="ml-2">Contract Documents</span></h3>
        {documents.map(doc => (
          <div key={doc.id} className="p-3 border rounded-lg bg-slate-50 relative">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1">
                    <input 
                        type="text" 
                        value={doc.title} 
                        onChange={e => handleUpdate(doc.id, { title: e.target.value })}
                        disabled={isReadOnly}
                        className="w-full text-base font-semibold p-1 border-b bg-transparent focus:border-indigo-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                    />
                </div>
                {!isReadOnly && (
                  <div className="w-full sm:w-auto flex-shrink-0">
                      {doc.file ? (
                          <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-md">
                              <span className="text-sm font-medium text-indigo-700 truncate mr-2">{doc.file.name}</span>
                              <label htmlFor={`file-upload-${doc.id}`} className="cursor-pointer text-sm text-slate-500 hover:text-indigo-600 font-semibold">Change</label>
                          </div>
                      ) : (
                          <label htmlFor={`file-upload-${doc.id}`} className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-100 border border-slate-300">
                             <UploadIcon className="h-4 w-4 mr-2" /> Upload File
                          </label>
                      )}
                      <input type="file" id={`file-upload-${doc.id}`} className="sr-only" onChange={e => handleFileChange(doc.id, e.target.files ? e.target.files[0] : null)} />
                  </div>
                )}
                 {isReadOnly && doc.file && (
                    <a href={doc.file.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600">{doc.file.name}</a>
                )}
            </div>
             {!isReadOnly && (
              <button onClick={() => handleDeleteDoc(doc.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500">
                  <CloseIcon />
              </button>
             )}
          </div>
        ))}
         {!isReadOnly && (
          <button
            onClick={handleAddDoc}
            className="w-full mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
          >
              + Add Document / Amendment
          </button>
         )}
      </div>
  );
};

export default EditableDocumentList;