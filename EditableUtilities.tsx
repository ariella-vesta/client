
import React from 'react';
import { Utility } from '../../types';
import { CloseIcon } from '../ui/icons/CloseIcon';
import { WrenchScrewdriverIcon } from '../ui/icons/WrenchScrewdriverIcon';
import { LinkIcon } from '../ui/icons/LinkIcon';

interface EditableUtilitiesProps {
  utilities: Utility[];
  onUpdate: (updatedUtilities: Utility[]) => void;
  isReadOnly?: boolean;
}

const EditableUtilities: React.FC<EditableUtilitiesProps> = ({ utilities, onUpdate, isReadOnly = false }) => {

  const handleUpdate = (id: string, field: keyof Utility, value: string) => {
    onUpdate(utilities.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const handleAdd = () => {
    const newUtility: Utility = { id: 'u' + Date.now(), name: '', url: '' };
    onUpdate([...utilities, newUtility]);
  };

  const handleDelete = (id: string) => {
    onUpdate(utilities.filter(u => u.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-slate-800 tracking-wide flex items-center mb-4"><WrenchScrewdriverIcon /><span className="ml-2">Utilities</span></h3>
      <p className="text-sm text-slate-500 mb-4">
        Add local utility providers. The links will be shared with the client to help them set up their new home.
      </p>
      <div className="space-y-3">
        {utilities.map(util => (
          <div key={util.id} className="p-3 border rounded-lg flex flex-col sm:flex-row gap-3 relative items-center bg-slate-50">
            <input
              type="text"
              placeholder="Utility Name (e.g., City Water)"
              value={util.name}
              onChange={e => handleUpdate(util.id, 'name', e.target.value)}
              disabled={isReadOnly}
              className="w-full sm:w-1/3 text-sm p-2 border rounded-md disabled:bg-slate-100"
            />
            <div className="relative w-full sm:flex-1">
              <input
                type="url"
                placeholder="URL (e.g., https://utility.com/signup)"
                value={util.url}
                onChange={e => handleUpdate(util.id, 'url', e.target.value)}
                disabled={isReadOnly}
                className="w-full text-sm p-2 border rounded-md disabled:bg-slate-100"
              />
              {util.url && (
                <a href={util.url} target="_blank" rel="noopener noreferrer" className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-indigo-600">
                  <LinkIcon />
                </a>
              )}
            </div>
            {!isReadOnly && (
              <button onClick={() => handleDelete(util.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500 sm:relative sm:top-auto sm:right-auto">
                <CloseIcon />
              </button>
            )}
          </div>
        ))}
      </div>
      {!isReadOnly && (
        <button
          onClick={handleAdd}
          className="w-full mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
        >
          + Add Utility
        </button>
      )}
    </div>
  );
};

export default EditableUtilities;