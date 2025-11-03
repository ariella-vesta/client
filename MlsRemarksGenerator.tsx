
import React, { useState } from 'react';
import { MlsGenerationInputs } from '../../../types';
import Card from '../../ui/Card';
import { SparklesIcon } from '../../ui/icons/SparklesIcon';
import { GoogleGenAI } from "@google/genai";

interface MlsRemarksGeneratorProps {
  inputs: MlsGenerationInputs;
  onUpdateInputs: (updatedInputs: MlsGenerationInputs) => void;
  onApplyRemarks: (remarks: string) => void;
}

const MlsRemarksGenerator: React.FC<MlsRemarksGeneratorProps> = ({ inputs, onUpdateInputs, onApplyRemarks }) => {
  const [generatedRemarks, setGeneratedRemarks] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (field: keyof MlsGenerationInputs, value: string) => {
    onUpdateInputs({ ...inputs, [field]: value });
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    setGeneratedRemarks('');
    try {
      if (!process.env.API_KEY) {
        throw new Error("API key is not configured.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const fullPrompt = `
        You are a real estate marketing expert who writes compelling, professional MLS remarks.
        
        Property Information:
        ${inputs.propertyInfo}
        
        Client Notes / Selling Points:
        ${inputs.clientNotes}
        
        Your Instructions:
        ${inputs.customPrompt}
        
        Based on all the information above, please generate the MLS remarks.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });

      setGeneratedRemarks(response.text);
    } catch (e) {
        console.error("Error generating MLS remarks:", e);
        setError("Failed to generate remarks. Please check the console for details.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card title="MLS Remarks Generator" icon={<SparklesIcon />}>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Key Property Info</label>
          <textarea
            value={inputs.propertyInfo}
            onChange={e => handleChange('propertyInfo', e.target.value)}
            rows={3}
            className="mt-1 w-full p-2 border rounded-md"
            placeholder="e.g., 4 bed, 3 bath, 2500 sqft, renovated kitchen..."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Client Notes / Key Selling Points</label>
          <textarea
            value={inputs.clientNotes}
            onChange={e => handleChange('clientNotes', e.target.value)}
            rows={2}
            className="mt-1 w-full p-2 border rounded-md"
            placeholder="e.g., Loves the backyard for entertaining, very private..."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Custom Prompt / Instructions</label>
          <textarea
            value={inputs.customPrompt}
            onChange={e => handleChange('customPrompt', e.target.value)}
            rows={2}
            className="mt-1 w-full p-2 border rounded-md"
            placeholder="e.g., Emphasize luxury and the new upgrades."
          />
        </div>
        <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-slate-400"
        >
            <SparklesIcon /> <span className="ml-2">{isLoading ? 'Generating...' : 'Generate with AI'}</span>
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {generatedRemarks && (
            <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold">Generated Remarks:</h4>
                <p className="mt-2 text-sm text-slate-700 p-3 bg-slate-50 rounded-md italic">"{generatedRemarks}"</p>
                <button
                    onClick={() => onApplyRemarks(generatedRemarks)}
                    className="w-full mt-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
                >
                    Apply to Public Remarks
                </button>
            </div>
        )}
      </div>
    </Card>
  );
};

export default MlsRemarksGenerator;
