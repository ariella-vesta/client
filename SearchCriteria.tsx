
import React from 'react';
import { SearchCriteria } from '../../types';
import { LinkIcon } from '../ui/icons/LinkIcon';

interface EditableSearchCriteriaProps {
  criteria: SearchCriteria;
  onUpdate: (updatedCriteria: SearchCriteria) => void;
  isReadOnly?: boolean;
}

const EditableSearchCriteriaCard: React.FC<EditableSearchCriteriaProps> = ({ criteria, onUpdate, isReadOnly = false }) => {

  const handleListChange = (field: 'nonNegotiables' | 'niceToHaves', value: string) => {
    onUpdate({ ...criteria, [field]: value.split('\n').filter(item => item.trim() !== '') });
  };
  
  const handleChange = (field: 'mlsSearchUrl' | 'neighborhoodsOrZipCodes', value: string) => {
      onUpdate({ ...criteria, [field]: value });
  }

  const TextAreaField: React.FC<{label: string, id: string, value: string, onChange: (val: string) => void}> = ({label, id, value, onChange}) => (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isReadOnly}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-50 disabled:cursor-not-allowed"
        />
      </div>
  );

  return (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800 tracking-wide">Home Search Criteria</h3>
        <TextAreaField label="Non-Negotiables (one per line)" id="non-negotiables" value={criteria.nonNegotiables.join('\n')} onChange={(val) => handleListChange('nonNegotiables', val)} />
        <TextAreaField label="Nice-To-Haves (one per line)" id="nice-to-haves" value={criteria.niceToHaves.join('\n')} onChange={(val) => handleListChange('niceToHaves', val)} />
        <TextAreaField label="Neighborhoods / Zip Codes (one per line)" id="neighborhoods" value={criteria.neighborhoodsOrZipCodes} onChange={(val) => handleChange('neighborhoodsOrZipCodes', val)} />
        <div>
          <label htmlFor="mls-url" className="block text-sm font-medium text-slate-700">MLS Portal Link</label>
           <div className="relative mt-1">
              <input
                type="url"
                id="mls-url"
                value={criteria.mlsSearchUrl}
                onChange={(e) => handleChange('mlsSearchUrl', e.target.value)}
                disabled={isReadOnly}
                className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-50 disabled:cursor-not-allowed"
              />
              {criteria.mlsSearchUrl && (
                <a href={criteria.mlsSearchUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-indigo-600">
                  <LinkIcon />
                </a>
              )}
           </div>
        </div>
    </div>
  );
};

export default EditableSearchCriteriaCard;