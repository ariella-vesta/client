import React, { useState } from 'react';
import { InvitationTemplates } from '../../types';
import Card from '../ui/Card';
import AiTemplateModal from './AiTemplateModal';
import { SparklesIcon } from '../ui/icons/SparklesIcon';

interface InvitationTemplateSettingsProps {
    templates: InvitationTemplates;
    onUpdate: (updatedTemplates: InvitationTemplates) => void;
}

const InvitationTemplateSettings: React.FC<InvitationTemplateSettingsProps> = ({ templates, onUpdate }) => {
    const [clientTypeTab, setClientTypeTab] = useState<'buyer' | 'seller'>('buyer');
    const [templateTypeTab, setTemplateTypeTab] = useState<'email' | 'text'>('email');

    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [editingContent, setEditingContent] = useState({ content: '', update: (newContent: string) => {} });
    
    const handleUpdate = (clientType: 'buyer' | 'seller', templateType: 'email' | 'text', value: string) => {
        const newTemplates = { ...templates };
        newTemplates[clientType][templateType] = value;
        onUpdate(newTemplates);
    };

    const openAiEditor = (clientType: 'buyer' | 'seller', templateType: 'email' | 'text') => {
        setEditingContent({
            content: templates[clientType][templateType],
            update: (newContent: string) => handleUpdate(clientType, templateType, newContent),
        });
        setAiModalOpen(true);
    };

    const handleSave = () => {
        alert("Invitation templates saved!");
    };
    
    const activeTemplate = templates[clientTypeTab][templateTypeTab];

    return (
        <Card title="Manage Invitation Templates">
            <p className="text-sm text-slate-500 mb-4">
                Customize the default welcome messages sent to new clients. Use [Client Name], [Agent Name], and [Portal Link] as placeholders.
            </p>
            <div className="flex border-b">
                {(['buyer', 'seller'] as const).map(type => (
                    <button key={type} onClick={() => setClientTypeTab(type)} className={`capitalize px-4 py-2 text-sm font-medium ${clientTypeTab === type ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                        {type}
                    </button>
                ))}
            </div>
            <div className="flex border-b bg-slate-50">
                {(['email', 'text'] as const).map(type => (
                    <button key={type} onClick={() => setTemplateTypeTab(type)} className={`capitalize px-4 py-2 text-sm font-medium ${templateTypeTab === type ? 'bg-white text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                        {type}
                    </button>
                ))}
            </div>
            
            <div className="p-4">
                <div className="relative">
                    <textarea
                        value={activeTemplate}
                        onChange={(e) => handleUpdate(clientTypeTab, templateTypeTab, e.target.value)}
                        rows={8}
                        className="w-full p-2 border rounded-md"
                    />
                    <button onClick={() => openAiEditor(clientTypeTab, templateTypeTab)} className="absolute bottom-2 right-2 inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md hover:bg-indigo-200">
                        <SparklesIcon /> <span className="ml-1">Build/Edit with AI</span>
                    </button>
                </div>
            </div>
            
            <div className="mt-6 text-right border-t pt-4">
                <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700">
                    Save Invitation Templates
                </button>
            </div>

            <AiTemplateModal
                isOpen={aiModalOpen}
                onClose={() => setAiModalOpen(false)}
                initialContent={editingContent.content}
                onApply={(newContent) => {
                    editingContent.update(newContent);
                }}
            />
        </Card>
    );
};

export default InvitationTemplateSettings;