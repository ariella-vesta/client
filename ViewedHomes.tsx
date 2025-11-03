
import React from 'react';
import { ViewedHome } from '../../types';
import { LinkIcon } from '../ui/icons/LinkIcon';

interface EditableViewedHomesProps {
  homes: ViewedHome[];
  onUpdate: (updatedHomes: ViewedHome[]) => void;
  isReadOnly?: boolean;
}

const toDateInput = (date: Date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
};


const EditableViewedHomes: React.FC<EditableViewedHomesProps> = ({ homes, onUpdate, isReadOnly = false }) => {
  
  const handleHomeChange = (id: number, field: keyof ViewedHome, value: string | number) => {
    let newHomes = homes.map(home => 
        home.id === id ? { ...home, [field]: field === 'viewedDate' ? new Date(value as string) : value } : home
    );
    if (field === 'address') {
        newHomes = newHomes.map(home => 
            home.id === id ? { ...home, imageUrl: `https://source.unsplash.com/400x300/?house,${encodeURIComponent(value as string)}` } : home
        );
    }
    onUpdate(newHomes);
  };

  const handleAddHome = () => {
    const newHome: ViewedHome = {
        id: Date.now(),
        address: "New Address, City, State",
        imageUrl: "https://source.unsplash.com/400x300/?house,new",
        ranking: 0,
        notes: "",
        price: 0,
        neighborhood: "",
        mlsLink: "",
        viewedDate: new Date(),
    };
    onUpdate([...homes, newHome]);
  };
  
  const handleDeleteHome = (id: number) => {
    onUpdate(homes.filter(home => home.id !== id));
  }

  const formatCurrency = (value: number | undefined) => value ? value.toString() : '';
  const parseCurrency = (value: string) => parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;

  return (
    <div className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-800 tracking-wide">Viewed Homes</h3>
        {homes.map(home => (
          <div key={home.id} className="p-4 border rounded-lg relative bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <img src={home.imageUrl} alt={`View of ${home.address}`} className="w-full sm:w-40 h-32 object-cover rounded-md flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                            <div>
                                <label className="text-xs font-medium text-slate-500">Address</label>
                                <input type="text" value={home.address} onChange={e => handleHomeChange(home.id, 'address', e.target.value)} disabled={isReadOnly} className="w-full p-1 border rounded-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100"/>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div>
                                    <label className="text-xs font-medium text-slate-500">Viewed Date</label>
                                    <input type="date" value={toDateInput(home.viewedDate)} onChange={e => handleHomeChange(home.id, 'viewedDate', e.target.value)} disabled={isReadOnly} className="w-full p-1 border rounded-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100"/>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500">Price</label>
                                    <input type="text" value={`$${formatCurrency(home.price).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} onChange={e => handleHomeChange(home.id, 'price', parseCurrency(e.target.value))} disabled={isReadOnly} className="w-full p-1 border rounded-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100"/>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500">Neighborhood</label>
                                    <input type="text" value={home.neighborhood} onChange={e => handleHomeChange(home.id, 'neighborhood', e.target.value)} disabled={isReadOnly} className="w-full p-1 border rounded-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100"/>
                                </div>
                            </div>
                            <div className="relative">
                                <label className="text-xs font-medium text-slate-500">MLS Link</label>
                                <input type="url" value={home.mlsLink} onChange={e => handleHomeChange(home.id, 'mlsLink', e.target.value)} disabled={isReadOnly} className="w-full p-1 border rounded-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100"/>
                                {home.mlsLink && (
                                    <a href={home.mlsLink} target="_blank" rel="noopener noreferrer" className="absolute inset-y-0 right-0 top-4 flex items-center pr-3 text-slate-400 hover:text-indigo-600">
                                        <LinkIcon />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-2">
                        <p className="text-xs font-medium text-slate-500">Client Rating & Notes (Read-only)</p>
                        <div className="flex items-center text-amber-500 font-bold text-lg my-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          <span>{home.ranking} / 10</span>
                        </div>
                         <textarea
                            className="mt-1 w-full p-2 border rounded-md text-sm bg-slate-100 cursor-not-allowed"
                            rows={2}
                            value={home.notes}
                            readOnly
                        />
                    </div>
                </div>
                <div className="lg:col-span-2 h-64 md:h-full">
                     <iframe
                        className="w-full h-full border-0 rounded-md"
                        loading="lazy"
                        allowFullScreen
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(home.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}>
                    </iframe>
                </div>
            </div>
             {!isReadOnly && (
              <button onClick={() => handleDeleteHome(home.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
             )}
          </div>
        ))}
        {!isReadOnly && (
          <button
              onClick={handleAddHome}
              className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-md hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
              + Add Home
          </button>
        )}
      </div>
  );
};

export default EditableViewedHomes;