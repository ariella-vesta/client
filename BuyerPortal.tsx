import React, { useState, useCallback } from 'react';
// FIX: Add BuyerClientData to imports
import { BuyerClientData, ClientData, ViewedHome, BuyerDocument, TimelineEvent, Contact, StrategySession, SearchCriteria } from '../types';
// FIX: Corrected import from 'mockClientData' to 'mockClients'.
import { mockClients } from '../services/mockData';
import EditableTimeline from './sections/Timeline';
import EditableStrategySessionCard from './sections/StrategySession';
import EditableSearchCriteriaCard from './sections/SearchCriteria';
import EditableDocumentList from './sections/DocumentList';
import EditableImportantContacts from './sections/ImportantContacts';
import EditableViewedHomes from './sections/ViewedHomes';

const AdminDashboard: React.FC = () => {
  // FIX: Initialize with a specific buyer client and use the BuyerClientData type.
  const [clientData, setClientData] = useState<BuyerClientData | undefined>(mockClients.find(c => c.clientType === 'Buyer') as BuyerClientData);
  const [isDirty, setIsDirty] = useState(false);

  const setDataAndMarkDirty = (newData: BuyerClientData) => {
    setClientData(newData);
    setIsDirty(true);
  }

  // FIX: Update the handler to work with BuyerClientData keys
  const handleUpdate = <T extends keyof BuyerClientData>(key: T, value: BuyerClientData[T]) => {
    if (clientData) {
      setDataAndMarkDirty({ ...clientData, [key]: value });
    }
  };

  const handleSaveChanges = () => {
    console.log("Saving data to backend:", clientData);
    // In a real app, you'd make an API call here.
    alert("Client data saved! (Check console for output)");
    setIsDirty(false);
  }

  // FIX: Added a check in case no buyer is found in mock data
  if (!clientData) {
    return <div>No buyer client data available to display.</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="mt-1 text-lg text-slate-600">Managing Client: <span className="font-semibold text-indigo-600">{clientData.clientName}</span></p>
        </div>
        {isDirty && (
            <button
                onClick={handleSaveChanges}
                className="mt-4 sm:mt-0 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all animate-pulse"
            >
                Save Changes
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          {/* FIX: Correctly call handleUpdate with buyer-specific properties */}
          <EditableTimeline 
            events={clientData.timeline} 
            onUpdate={(events) => handleUpdate('timeline', events)} 
          />
        </div>
        
        <EditableStrategySessionCard 
          session={clientData.strategySession} 
          onUpdate={(session) => handleUpdate('strategySession', session)}
        />
        <EditableSearchCriteriaCard 
            criteria={clientData.searchCriteria} 
            onUpdate={(criteria) => handleUpdate('searchCriteria', criteria)}
        />
        <EditableImportantContacts 
            contacts={clientData.contacts} 
            // FIX: Added missing `masterVendorList` prop required by EditableImportantContacts.
            masterVendorList={clientData.masterVendorList}
            onUpdate={(contacts) => handleUpdate('contacts', contacts)}
        />
        
        <div className="lg:col-span-2">
            <EditableViewedHomes 
                homes={clientData.viewedHomes}
                onUpdate={(homes) => handleUpdate('viewedHomes', homes)}
            />
        </div>
        
        <EditableDocumentList 
            documents={clientData.documents}
            onUpdate={(documents) => handleUpdate('documents', documents)}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;