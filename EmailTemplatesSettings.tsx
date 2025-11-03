
import React, { useState } from 'react';
import { EmailTemplate, TextTemplate } from '../../types';
import Card from '../ui/Card';
import TemplateEditor from './TemplateEditor';
import AiTemplateModal from './AiTemplateModal';
import { EmailIcon } from '../ui/icons/EmailIcon';
import { ChatBubbleOvalLeftEllipsisIcon } from '../ui/icons/ChatBubbleOvalLeftEllipsisIcon';

const initialBuyerEmailTemplates: EmailTemplate[] = [
    { id: 'be1', name: 'Welcome Email', subject: 'Welcome to Your Home Buying Journey!', body: 'Hi [Client Name],\n\nWe are so excited to partner with you!' },
];
const initialBuyerTextTemplates: TextTemplate[] = [
    { id: 'bt1', name: 'Welcome Text', body: 'Hi [Client Name]! Welcome to the portal. We are excited to work with you.' },
];
const initialSellerEmailTemplates: EmailTemplate[] = [
    { id: 'se1', name: 'Seller Welcome', subject: 'Let\'s Get Your Home Sold!', body: 'Hi [Client Name],\n\nWelcome! This portal will be our command center for selling your home.' },
];
const initialSellerTextTemplates: TextTemplate[] = [
    { id: 'st1', name: 'Seller Welcome Text', body: 'Hi [Client Name]! Excited to get your home on the market. Let\'s get started.' },
];

const EmailTemplatesSettings: React.FC = () => {
    const [clientTypeTab, setClientTypeTab] = useState<'Buyer' | 'Seller'>('Buyer');
    const [templateTypeTab, setTemplateTypeTab] = useState<'Email' | 'Text'>('Email');

    const [buyerEmails, setBuyerEmails] = useState(initialBuyerEmailTemplates);
    const [buyerTexts, setBuyerTexts] = useState(initialBuyerTextTemplates);
    const [sellerEmails, setSellerEmails] = useState(initialSellerEmailTemplates);
    const [sellerTexts, setSellerTexts] = useState(initialSellerTextTemplates);

    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<{ id: string; content: string; update: (newContent: string) => void } | null>(null);

    const getActiveTemplates = () => {
        if (clientTypeTab === 'Buyer') {
            return templateTypeTab === 'Email' ? { templates: buyerEmails, set: setBuyerEmails } : { templates: buyerTexts, set: setBuyerTexts };
        }
        return templateTypeTab === 'Email' ? { templates: sellerEmails, set: setSellerEmails } : { templates: sellerTexts, set: setSellerTexts };
    };

    const { templates, set } = getActiveTemplates();

    const handleAdd = () => {
        if (templateTypeTab === 'Email') {
            const newTemplate: EmailTemplate = { id: `e${Date.now()}`, name: 'New Email Template', subject: '', body: '' };
            (set as React.Dispatch<React.SetStateAction<EmailTemplate[]>>)(prev => [...prev, newTemplate]);
        } else {
            const newTemplate: TextTemplate = { id: `t${Date.now()}`, name: 'New Text Template', body: '' };
            (set as React.Dispatch<React.SetStateAction<TextTemplate[]>>)(prev => [...prev, newTemplate]);
        }
    };

    const handleUpdate = (id: string, updatedTemplate: EmailTemplate | TextTemplate) => {
        (set as any)(prev => prev.map(t => t.id === id ? updatedTemplate : t));
    };

    const handleDelete = (id: string) => {
        (set as any)(prev => prev.filter(t => t.id !== id));
    };
    
    const openAiEditor = (id: string, content: string) => {
        setEditingTemplate({
            id,
            content,
            update: (newContent: string) => handleUpdate(id, { ...templates.find(t => t.id === id)!, body: newContent }),
        });
        setAiModalOpen(true);
    };
    
    const handleSave = () => {
        alert('All templates saved! (Check console for output)');
        console.log({ buyerEmails, buyerTexts, sellerEmails, sellerTexts });
    };

    return (
        <Card title="Manage Communication Templates">
            <div className="flex border-b">
                {['Buyer', 'Seller'].map(type => (
                    <button key={type} onClick={() => setClientTypeTab(type as any)} className={`px-4 py-2 text-sm font-medium ${clientTypeTab === type ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                        {type} Templates
                    </button>
                ))}
            </div>
             <div className="flex border-b bg-slate-50">
                {['Email', 'Text'].map(type => (
                    <button key={type} onClick={() => setTemplateTypeTab(type as any)} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${templateTypeTab === type ? 'bg-white text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                        {type === 'Email' ? <EmailIcon /> : <ChatBubbleOvalLeftEllipsisIcon />}
                        {type} Templates
                    </button>
                ))}
            </div>
            
            <div className="p-4 space-y-4">
                {templates.map(template => (
                    <TemplateEditor
                        key={template.id}
                        template={template}
                        isEmail={templateTypeTab === 'Email'}
                        onUpdate={(updated) => handleUpdate(template.id, updated)}
                        onDelete={() => handleDelete(template.id)}
                        onOpenAi={() => openAiEditor(template.id, template.body)}
                    />
                ))}
                 <button onClick={handleAdd} className="w-full mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200">
                    + Add New {templateTypeTab} Template
                </button>
            </div>
            
            <div className="mt-6 text-right border-t pt-4">
                <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700">
                    Save All Templates
                </button>
            </div>

            {editingTemplate && (
                <AiTemplateModal
                    isOpen={aiModalOpen}
                    onClose={() => setAiModalOpen(false)}
                    initialContent={editingTemplate.content}
                    onApply={(newContent) => {
                        editingTemplate.update(newContent);
                    }}
                />
            )}
        </Card>
    );
};

export default EmailTemplatesSettings;