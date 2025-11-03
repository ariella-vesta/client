import React from 'react';
import { EmailTemplate, TextTemplate, UploadedFile } from '../../types';
import { CloseIcon } from '../ui/icons/CloseIcon';
import { SparklesIcon } from '../ui/icons/SparklesIcon';
import { UploadIcon } from '../ui/icons/UploadIcon';

interface TemplateEditorProps {
  template: EmailTemplate | TextTemplate;
  isEmail: boolean;
  onUpdate: (updatedTemplate: EmailTemplate | TextTemplate) => void;
  onDelete: () => void;
  onOpenAi: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ template, isEmail, onUpdate, onDelete, onOpenAi }) => {

  const handleChange = (field: keyof EmailTemplate | keyof TextTemplate, value: string) => {
    onUpdate({ ...template, [field]: value });
  };
  
  const handleFileChange = (file: File | null) => {
    if (file && 'attachment' in template) {
      const newFile: UploadedFile = { name: file.name, url: URL.createObjectURL(file) };
      onUpdate({ ...template, attachment: newFile });
    }
  };

  return (
    <div className="p-3 border rounded-lg bg-slate-50 relative">
      <button onClick={onDelete} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500">
        <CloseIcon />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Template Name"
          value={template.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="md:col-span-2 w-full p-2 border rounded-md font-semibold"
        />
        {isEmail && 'subject' in template && (
          <input
            type="text"
            placeholder="Email Subject"
            value={template.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className="md:col-span-2 w-full p-2 border rounded-md"
          />
        )}
      </div>
      <div className="mt-2 relative">
        <textarea
          placeholder="Template Body..."
          value={template.body}
          onChange={(e) => handleChange('body', e.target.value)}
          rows={6}
          className="w-full p-2 border rounded-md"
        />
        <button onClick={onOpenAi} className="absolute bottom-2 right-2 inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md hover:bg-indigo-200">
            <SparklesIcon /> <span className="ml-1">Build/Edit with AI</span>
        </button>
      </div>
       {isEmail && 'attachment' in template && (
         <div className="mt-2">
            <label htmlFor={`attachment-${template.id}`} className="cursor-pointer inline-flex items-center justify-center px-3 py-2 bg-white text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-100 border border-slate-300">
                <UploadIcon className="h-4 w-4 mr-2" /> 
                {template.attachment ? `Change Attachment: ${template.attachment.name}` : 'Add Attachment'}
            </label>
            <input type="file" id={`attachment-${template.id}`} className="sr-only" onChange={e => handleFileChange(e.target.files ? e.target.files[0] : null)} />
         </div>
      )}
    </div>
  );
};

export default TemplateEditor;