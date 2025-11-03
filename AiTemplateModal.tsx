import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { SparklesIcon } from '../ui/icons/SparklesIcon';
import { GoogleGenAI } from "@google/genai";

interface AiTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent: string;
  onApply: (newContent: string) => void;
}

const AiTemplateModal: React.FC<AiTemplateModalProps> = ({ isOpen, onClose, initialContent, onApply }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (!process.env.API_KEY) throw new Error("API key is not configured.");
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const fullPrompt = `
        You are a helpful assistant for a real estate agent.
        The agent is working on an email or text message template.
        
        Here is the agent's current text (it might be blank):
        ---
        ${initialContent}
        ---
        
        Here is the agent's request:
        "${prompt}"
        
        Please fulfill the request and provide the new version of the text.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });

      setGeneratedContent(response.text);
    } catch (e) {
      console.error("Error generating with AI:", e);
      setError("Failed to generate content. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleApply = () => {
      onApply(generatedContent);
      onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Build/Edit with AI">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Current Content</label>
          <textarea
            value={initialContent}
            readOnly
            rows={10}
            className="mt-1 w-full p-2 border rounded-md bg-slate-50 text-slate-600"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Generated Content</label>
          <textarea
            value={generatedContent}
            onChange={(e) => setGeneratedContent(e.target.value)}
            rows={10}
            className="mt-1 w-full p-2 border rounded-md bg-white"
            placeholder="AI will generate content here..."
          />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div>
          <label htmlFor="ai-prompt" className="text-sm font-medium text-slate-700">Your Prompt</label>
          <input
            type="text"
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., 'Make this more friendly' or 'Write a text to remind about inspection'"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-3">
            <button onClick={handleGenerate} disabled={isLoading || !prompt} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-slate-400">
                <SparklesIcon /> <span className="ml-2">{isLoading ? 'Generating...' : 'Generate'}</span>
            </button>
             <button onClick={handleApply} disabled={!generatedContent} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-slate-400">
                Apply Changes
            </button>
        </div>
      </div>
    </Modal>
  );
};

export default AiTemplateModal;