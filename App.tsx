
import React, { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import ClientPortal from './components/ClientPortal';
import SettingsPage from './components/SettingsPage';
import ClientList from './components/ClientList';
import { mockClients, mockInvitationTemplates, mockMasterListingPaperwork, mockBuyerTimelineTemplates, mockSellerPreListTimelineTemplates, mockSellerTransactionTimelineTemplates } from './services/mockData';
import { ClientData, ClientType, BuyerClientData, SellerClientData, InvitationTemplates, ListingPaperworkTemplate, TimelineTemplateEvent } from './types';

// Default templates for new clients
const defaultBuyerTemplate: Omit<BuyerClientData, 'id' | 'clientName' | 'crmLink' | 'clientEmails' | 'clientPhones'> = {
  clientType: 'Buyer',
  clientPhase: 'Appointment',
  intakeFormUrl: "https://form.jotform.com/",
  clientMotivation: "",
  strategySession: { date: new Date(), zoomLink: "", recordingUrl: "", googleCalendarLink: "" },
  exploratoryAppointment: { date: new Date(), googleCalendarLink: "" },
  searchCriteria: { nonNegotiables: [], niceToHaves: [], neighborhoodsOrZipCodes: "", mlsSearchUrl: "" },
  documents: [], viewedHomes: [], timeline: [], contacts: [], masterVendorList: [], utilities: [],
  propertyDetails: { address: "", purchasePrice: 0, closingCosts: 0, imageUrl: "" },
  coopAgent: { name: "", email: "", phone: "", brokerage: "" },
  offerPrepContent: [],
  agent: { name: "Your Awesome Agent", email: "agent@homewardbound.com", phone: "555-AGENT-NOW", photoUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop" },
  recentActivity: [],
};

const defaultSellerTemplate: Omit<SellerClientData, 'id' | 'clientName' | 'crmLink' | 'clientEmails' | 'clientPhones'> = {
    clientType: 'Seller',
    clientPhase: 'Appointment',
    intakeFormUrl: "https://form.jotform.com/",
    strategySession: { date: new Date(), zoomLink: "", recordingUrl: "", googleCalendarLink: "" },
    homeWalkthrough: { date: new Date(), googleCalendarLink: "" },
    listingTimeline: [], 
    renovationTasks: [], 
    photoPrepContent: [], 
    listingPaperwork: [],
    propertyInfo: { address: "123 Main St, Anytown, USA", primaryPhotoUrl: "https://source.unsplash.com/800x600/?house", walkthroughNotes: "", additionalPhotos: [] },
    listingDetails: { publicRemarks: "", privateRemarks: "", googleDriveLink: "", photoGalleryLink: "", videoMediaLink: ""},
    teamMedia: { photosUrl: "", videoUrl: "", mlsRemarks: "" },
    listingPerformance: { listingUrl: "", price: 0, bedrooms: 0, bathrooms: 0, sqft: 0, yearBuilt: 0, remarks: "", showings: [], comparableProperties: [], totalViews: { zillow: 0, redfin: 0, realtor: 0, homes: 0 } },
    marketingEvents: [],
    underContractTimeline: [],
    contractDetails: { address: "123 Main St", purchasePrice: 0, closingCosts: 0, imageUrl: "https://source.unsplash.com/800x600/?house" },
    contractDocuments: [],
    assignedLockboxId: undefined,
    signInstallerInfo: {},
    mlsGenerationInputs: { propertyInfo: '', clientNotes: '', customPrompt: '' },
    contacts: [], masterVendorList: [], utilities: [],
    agent: { name: "Your Awesome Agent", email: "agent@homewardbound.com", phone: "555-AGENT-NOW", photoUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop" },
    recentActivity: [],
};


const App: React.FC = () => {
  const [view, setView] = useState<'admin' | 'agent' | 'client' | 'settings'>('admin');
  const [clients, setClients] = useState<ClientData[]>(mockClients);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [invitationTemplates, setInvitationTemplates] = useState<InvitationTemplates>(mockInvitationTemplates);
  const [masterPaperwork, setMasterPaperwork] = useState<ListingPaperworkTemplate[]>(mockMasterListingPaperwork);
  const [buyerTimelineTemplates, setBuyerTimelineTemplates] = useState<TimelineTemplateEvent[]>(mockBuyerTimelineTemplates);
  const [sellerPreListTimelineTemplates, setSellerPreListTimelineTemplates] = useState<TimelineTemplateEvent[]>(mockSellerPreListTimelineTemplates);
  const [sellerTransactionTimelineTemplates, setSellerTransactionTimelineTemplates] = useState<TimelineTemplateEvent[]>(mockSellerTransactionTimelineTemplates);


  const handleUpdateClient = (updatedClient: ClientData) => {
    setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
  };
  
  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter(c => c.id !== clientId));
    if (selectedClientId === clientId) {
      setSelectedClientId(null);
    }
  };

  const handleAddNewClient = (details: { name: string, type: ClientType, crmLink: string, email: string, phone: string }) => {
    const commonDetails = {
      id: 'client-' + Date.now(),
      clientName: details.name,
      crmLink: details.crmLink,
      clientEmails: [details.email, ""],
      clientPhones: [details.phone, ""],
    };

    const newClient: ClientData = details.type === 'Buyer' 
        ? { ...commonDetails, ...defaultBuyerTemplate, clientType: 'Buyer' }
        : { ...commonDetails, ...defaultSellerTemplate, clientType: 'Seller' };

    setClients([...clients, newClient]);
    return newClient;
  };

  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId);
  };

  const handleBackToList = () => {
    setSelectedClientId(null);
  };
  
  const getHeaderText = () => {
    const selectedClient = clients.find(c => c.id === selectedClientId);
    switch (view) {
      case 'admin':
        return selectedClient ? `Admin - ${selectedClient.clientName}` : 'All Clients';
      case 'agent':
        return selectedClient ? `Agent View - ${selectedClient.clientName}` : 'All Clients';
      case 'client':
        const clientName = selectedClient?.clientName || 'Portal';
        return `${clientName} Portal`;
      case 'settings':
        return 'Company Settings';
      default:
        return 'Homeward Bound';
    }
  };

  const renderAdminView = (isReadOnly: boolean) => {
    if (selectedClientId) {
      const selectedClient = clients.find(c => c.id === selectedClientId);
      if (selectedClient) {
        return <AdminDashboard 
          clientData={selectedClient} 
          onUpdate={handleUpdateClient} 
          onBack={handleBackToList}
          setView={setView} 
          masterPaperwork={masterPaperwork}
          isReadOnly={isReadOnly}
          timelineTemplates={{
            buyer: buyerTimelineTemplates,
            sellerPreList: sellerPreListTimelineTemplates,
            sellerTransaction: sellerTransactionTimelineTemplates,
          }}
        />;
      }
    }
    return <ClientList 
      clients={clients} 
      onSelectClient={handleSelectClient} 
      onAddClient={handleAddNewClient} 
      setView={setView} 
      onUpdateClient={handleUpdateClient}
      onDeleteClient={handleDeleteClient}
      invitationTemplates={invitationTemplates}
    />;
  };

  const renderView = () => {
    const clientToView = clients.find(c => c.id === selectedClientId);
    switch (view) {
      case 'admin':
        return renderAdminView(false);
      case 'agent':
        return renderAdminView(true);
      case 'client':
        if (!clientToView) {
            handleBackToList();
            setView('admin');
            return <div className="p-8 text-center">No client selected. Returning to client list.</div>;
        }
        return <ClientPortal clientData={clientToView} onUpdate={handleUpdateClient} />;
      case 'settings':
        // FIX: Removed timelineTemplates and its updaters as they are not used in SettingsPage
        return <SettingsPage 
                  setView={setView} 
                  invitationTemplates={invitationTemplates}
                  onUpdateInvitationTemplates={setInvitationTemplates}
                  masterPaperwork={masterPaperwork}
                  onUpdateMasterPaperwork={setMasterPaperwork}
                />;
      default:
        return renderAdminView(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="ml-3 text-2xl font-bold text-slate-900 tracking-tight">
                 {getHeaderText()}
              </span>
            </div>
            {view !== 'settings' && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-slate-600">Switch View:</span>
                <div className="relative inline-block w-32 text-left">
                    <select
                      value={view}
                      onChange={(e) => setView(e.target.value as 'admin' | 'agent' | 'client')}
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="agent">Agent (Read-Only)</option>
                      <option value="client">Client</option>
                    </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default App;