
import React from 'react';
import { ListingPerformance, Showing, ComparableProperty } from '../../../types';
import Card from '../../ui/Card';
import { CloseIcon } from '../../ui/icons/CloseIcon';
import { PresentationChartBarIcon } from '../../ui/icons/PresentationChartBarIcon';

interface EditableListingPerformanceProps {
  performance: ListingPerformance;
  onUpdate: (updatedPerformance: ListingPerformance) => void;
}

const EditableListingPerformance: React.FC<EditableListingPerformanceProps> = ({ performance, onUpdate }) => {

  const handlePerfChange = (field: keyof ListingPerformance, value: string | number) => {
    onUpdate({ ...performance, [field]: value });
  };
  
  const handleViewsChange = (source: keyof ListingPerformance['totalViews'], value: number) => {
    onUpdate({ ...performance, totalViews: { ...performance.totalViews, [source]: value } });
  };
  
  const handleShowingChange = (id: string, updatedShowing: Partial<Showing>) => {
      onUpdate({ ...performance, showings: performance.showings.map(s => s.id === id ? {...s, ...updatedShowing} : s)});
  }
  
  const handleAddShowing = () => {
      const newShowing: Showing = { id: 's' + Date.now(), date: new Date(), feedback: ''};
      onUpdate({ ...performance, showings: [...performance.showings, newShowing] });
  }

  const handleDeleteShowing = (id: string) => {
      onUpdate({ ...performance, showings: performance.showings.filter(s => s.id !== id) });
  }
  
  // Similar handlers for Comps
  const handleCompChange = (id: string, field: keyof ComparableProperty, value: string | number) => {
      onUpdate({ ...performance, comparableProperties: performance.comparableProperties.map(c => c.id === id ? {...c, [field]: value} : c)});
  }
  const handleAddComp = () => {
      const newComp: ComparableProperty = { id: 'c' + Date.now(), address: '', price: 0, status: 'Active', url: ''};
      onUpdate({ ...performance, comparableProperties: [...performance.comparableProperties, newComp] });
  }
  const handleDeleteComp = (id: string) => {
      onUpdate({ ...performance, comparableProperties: performance.comparableProperties.filter(c => c.id !== id) });
  }
  
  const toDateInput = (date: Date) => date.toISOString().split('T')[0];

  return (
    <Card title="Manage Live Listing Performance" icon={<PresentationChartBarIcon />}>
        <div className="space-y-6">
            {/* Main Listing Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                    <label className="text-sm font-medium">Listing URL</label>
                    <input type="url" value={performance.listingUrl} onChange={e => handlePerfChange('listingUrl', e.target.value)} className="w-full p-2 border rounded-md"/>
                </div>
                <div className="lg:col-span-3">
                     <label className="text-sm font-medium">Public Remarks (Client-Facing)</label>
                    <input type="text" value={performance.remarks} onChange={e => handlePerfChange('remarks', e.target.value)} className="w-full p-2 border rounded-md"/>
                </div>
                <div>
                    <label className="text-sm font-medium">Price</label>
                    <input type="number" value={performance.price} onChange={e => handlePerfChange('price', Number(e.target.value))} className="w-full p-2 border rounded-md"/>
                </div>
                 <div>
                    <label className="text-sm font-medium">Bedrooms</label>
                    <input type="number" value={performance.bedrooms} onChange={e => handlePerfChange('bedrooms', Number(e.target.value))} className="w-full p-2 border rounded-md"/>
                </div>
                 <div>
                    <label className="text-sm font-medium">Bathrooms</label>
                    <input type="number" value={performance.bathrooms} onChange={e => handlePerfChange('bathrooms', Number(e.target.value))} className="w-full p-2 border rounded-md"/>
                </div>
                 <div>
                    <label className="text-sm font-medium">SqFt</label>
                    <input type="number" value={performance.sqft} onChange={e => handlePerfChange('sqft', Number(e.target.value))} className="w-full p-2 border rounded-md"/>
                </div>
                 <div>
                    <label className="text-sm font-medium">Year Built</label>
                    <input type="number" value={performance.yearBuilt} onChange={e => handlePerfChange('yearBuilt', Number(e.target.value))} className="w-full p-2 border rounded-md"/>
                </div>
                 <div className="lg:col-span-full">
                     <label className="text-sm font-medium">MLS Comparables Portal URL</label>
                    <input type="url" value={performance.compsPortalUrl || ''} onChange={e => handlePerfChange('compsPortalUrl', e.target.value)} className="w-full p-2 border rounded-md"/>
                </div>
            </div>

            {/* Online Views */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Online Views</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium">Zillow</label>
                  <input type="number" value={performance.totalViews.zillow} onChange={e => handleViewsChange('zillow', Number(e.target.value))} className="w-full p-2 border rounded-md"/>
                </div>
                <div>
                  <label className="text-sm font-medium">Redfin</label>
                  <input type="number" value={performance.totalViews.redfin} onChange={e => handleViewsChange('redfin', Number(e.target.value))} className="w-full p-2 border rounded-md"/>
                </div>
                <div>
                  <label className="text-sm font-medium">Realtor.com</label>
                  <input type="number" value={performance.totalViews.realtor} onChange={e => handleViewsChange('realtor', Number(e.target.value))} className="w-full p-2 border rounded-md"/>
                </div>
                <div>
                  <label className="text-sm font-medium">Homes.com</label>
                  <input type="number" value={performance.totalViews.homes} onChange={e => handleViewsChange('homes', Number(e.target.value))} className="w-full p-2 border rounded-md"/>
                </div>
              </div>
            </div>

            {/* Showings */}
            <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Showings & Feedback (Agent info is not shown to client)</h4>
                {performance.showings.map(s => (
                     <div key={s.id} className="p-3 border rounded-lg bg-slate-50 mb-3 relative">
                         <button onClick={() => handleDeleteShowing(s.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500"><CloseIcon /></button>
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                             <div className="md:col-span-4">
                                 <label className="text-xs font-medium">Feedback (Client-Facing)</label>
                                 <textarea value={s.feedback} onChange={e => handleShowingChange(s.id, { feedback: e.target.value })} placeholder="Enter feedback..." className="w-full p-2 border rounded-md"/>
                             </div>
                             <div>
                                 <label className="text-xs font-medium">Showing Agent Name</label>
                                 <input type="text" value={s.agentName || ''} onChange={e => handleShowingChange(s.id, { agentName: e.target.value })} className="w-full p-2 border rounded-md"/>
                             </div>
                              <div>
                                 <label className="text-xs font-medium">Agent Phone</label>
                                 <input type="tel" value={s.agentPhone || ''} onChange={e => handleShowingChange(s.id, { agentPhone: e.target.value })} className="w-full p-2 border rounded-md"/>
                             </div>
                              <div>
                                 <label className="text-xs font-medium">Agent Email</label>
                                 <input type="email" value={s.agentEmail || ''} onChange={e => handleShowingChange(s.id, { agentEmail: e.target.value })} className="w-full p-2 border rounded-md"/>
                             </div>
                             <div>
                                 <label className="text-xs font-medium">Showing Date</label>
                                 <input type="date" value={toDateInput(new Date(s.date))} onChange={e => handleShowingChange(s.id, { date: new Date(e.target.value) })} className="w-full p-2 border rounded-md"/>
                             </div>
                         </div>
                     </div>
                ))}
                <button onClick={handleAddShowing} className="text-sm text-indigo-600 font-semibold">+ Add Showing</button>
            </div>
            
            {/* Comps */}
            <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Comparable Properties</h4>
                 {performance.comparableProperties.map(c => (
                    <div key={c.id} className="grid grid-cols-10 gap-2 mb-2 items-center">
                        <input type="text" value={c.address} onChange={e => handleCompChange(c.id, 'address', e.target.value)} placeholder="Address" className="col-span-3 p-2 border rounded-md"/>
                        <input type="number" value={c.price} onChange={e => handleCompChange(c.id, 'price', Number(e.target.value))} placeholder="Price" className="col-span-2 p-2 border rounded-md"/>
                        <select value={c.status} onChange={e => handleCompChange(c.id, 'status', e.target.value)} className="col-span-2 p-2 border rounded-md">
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Sold</option>
                        </select>
                        <input type="url" value={c.url} onChange={e => handleCompChange(c.id, 'url', e.target.value)} placeholder="URL" className="col-span-2 p-2 border rounded-md"/>
                        <button onClick={() => handleDeleteComp(c.id)} className="col-span-1 justify-self-center"><CloseIcon /></button>
                    </div>
                ))}
                <button onClick={handleAddComp} className="text-sm text-indigo-600 font-semibold">+ Add Comp</button>
            </div>

        </div>
    </Card>
  );
};

export default EditableListingPerformance;
