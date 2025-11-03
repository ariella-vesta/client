
import React, { useState } from 'react';
import { EducationalContent, UploadedFile } from '../../types';
import { CloseIcon } from '../ui/icons/CloseIcon';
import { LinkIcon } from '../ui/icons/LinkIcon';

type UpdateKey = 'buyerBookUrl' | 'buyerBookFile' | 'purchaseAgreementPreviewFile' | 'offerPrepContent';
type UpdateValue = string | UploadedFile | EducationalContent[] | undefined;


interface EditableOfferPrepProps {
  clientData: {
    buyerBookUrl?: string;
    buyerBookFile?: UploadedFile;
    purchaseAgreementPreviewFile?: UploadedFile;
    content: EducationalContent[];
  };
  onUpdate: (key: UpdateKey, value: UpdateValue) => void;
  isReadOnly?: boolean;
}

const EditableOfferPrep: React.FC<EditableOfferPrepProps> = ({ clientData, onUpdate, isReadOnly = false }) => {
  const { buyerBookUrl, buyerBookFile, purchaseAgreementPreviewFile, content } = clientData;
  const [buyerBookInputType, setBuyerBookInputType] = useState<'url' | 'file'>(buyerBookUrl ? 'url' : 'file');

  const handleContentChange = (id: string, field: keyof EducationalContent, value: string) => {
    const updatedContent = content.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onUpdate('offerPrepContent', updatedContent);
  };
  
  const handleAddContent = () => {
    const newContent: EducationalContent = {
      id: 'op' + Date.now(),
      title: "New Topic",
      description: "",
      videoUrl: ""
    };
    onUpdate('offerPrepContent', [...content, newContent]);
  };

  const handleDeleteContent = (id: string) => {
    onUpdate('offerPrepContent', content.filter(item => item.id !== id));
  };
  
  const handleFileChange = (key: 'buyerBookFile' | 'purchaseAgreementPreviewFile', file: File | null) => {
      if (file) {
          const newFile: UploadedFile = { name: file.name, url: URL.createObjectURL(file) };
          onUpdate(key, newFile);
          if (key === 'buyerBookFile') {
              onUpdate('buyerBookUrl', undefined); // Clear URL if file is uploaded
          }
      }
  }

  return (
    <div>
        <h3 className="text-xl font-semibold text-slate-800 tracking-wide mb-4">'Ready to Offer' Section</h3>
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Buyer Book</label>
                    {!isReadOnly && (
                      <div className="flex items-center space-x-4 mt-1">
                          <label><input type="radio" name="buyerBookType" value="url" checked={buyerBookInputType === 'url'} onChange={() => setBuyerBookInputType('url')} /> URL</label>
                          <label><input type="radio" name="buyerBookType" value="file" checked={buyerBookInputType === 'file'} onChange={() => setBuyerBookInputType('file')} /> File Upload</label>
                      </div>
                    )}
                    {buyerBookInputType === 'url' ? (
                        <div className="relative mt-2">
                          <input 
                              type="url" 
                              placeholder="https://..."
                              value={buyerBookUrl || ''}
                              onChange={e => {
                                  onUpdate('buyerBookUrl', e.target.value);
                                  onUpdate('buyerBookFile', undefined);
                              }}
                              disabled={isReadOnly}
                              className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                          />
                           {buyerBookUrl && (
                            <a href={buyerBookUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-indigo-600">
                              <LinkIcon />
                            </a>
                          )}
                        </div>
                    ) : (
                         <div className="mt-2">
                             <input type="file" id="buyer-book-file" className="sr-only" onChange={e => handleFileChange('buyerBookFile', e.target.files ? e.target.files[0] : null)} disabled={isReadOnly} />
                             <label htmlFor="buyer-book-file" className={`w-full text-center block px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-md border border-slate-300 ${isReadOnly ? 'cursor-not-allowed bg-slate-100' : 'cursor-pointer hover:bg-slate-100'}`}>
                                {buyerBookFile ? `Selected: ${buyerBookFile.name}` : 'Choose File'}
                             </label>
                         </div>
                    )}
                </div>
                 <div>
                    <label htmlFor="pa-preview-file" className="block text-sm font-medium text-slate-700">Purchase Agreement Preview</label>
                    <div className="mt-1">
                        <input type="file" id="pa-preview-file" className="sr-only" onChange={e => handleFileChange('purchaseAgreementPreviewFile', e.target.files ? e.target.files[0] : null)} disabled={isReadOnly} />
                        <label htmlFor="pa-preview-file" className={`w-full text-center block px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-md border border-slate-300 ${isReadOnly ? 'cursor-not-allowed bg-slate-100' : 'cursor-pointer hover:bg-slate-100'}`}>
                           {purchaseAgreementPreviewFile ? `Selected: ${purchaseAgreementPreviewFile.name}` : 'Choose File'}
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-md font-semibold text-slate-800 border-t pt-4">Educational Content Items</h4>
                {content.map(item => (
                    <div key={item.id} className="p-3 border rounded-lg space-y-2 relative bg-slate-50">
                        {!isReadOnly && (
                          <button onClick={() => handleDeleteContent(item.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500">
                              <CloseIcon />
                          </button>
                        )}
                        <input type="text" placeholder="Title" value={item.title} onChange={e => handleContentChange(item.id, 'title', e.target.value)} disabled={isReadOnly} className="w-full text-base font-semibold p-1 border-b disabled:bg-slate-100"/>
                        <textarea placeholder="Description" value={item.description} onChange={e => handleContentChange(item.id, 'description', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-1 border-b disabled:bg-slate-100" rows={2}/>
                        <input type="url" placeholder="Video URL" value={item.videoUrl} onChange={e => handleContentChange(item.id, 'videoUrl', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-1 border-b disabled:bg-slate-100"/>
                    </div>
                ))}
            </div>

            {!isReadOnly && (
              <button
                  onClick={handleAddContent}
                  className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-md hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                  + Add Educational Topic
              </button>
            )}
        </div>
    </div>
  );
};

export default EditableOfferPrep;