import React, { useState } from 'react';
import { ClientData, BuyerPhase, SellerPhase, BuyerClientData, SellerClientData, ActivityItem, ListingPaperworkTemplate, TimelineTemplateEvent } from '../types';
import EditableTimeline from './sections/Timeline';
import EditableStrategySessionCard from './sections/StrategySession';
import EditableSearchCriteriaCard from './sections/SearchCriteria';
import EditableDocumentList from './sections/DocumentList';
import EditableImportantContacts from './sections/ImportantContacts';
import EditableViewedHomes from './sections/ViewedHomes';
import EditableCoopAgentInfo from './sections/CoopAgentInfo';
import BackendFeatures from './sections/BackendFeatures';
import ClientStatusHeader from './sections/ClientStatusHeader';
import EditableExploratoryAppointment from './sections/ExploratoryAppointment';
import EditableOfferPrep from './sections/EditableOfferPrep';
import { ArrowLeftIcon } from './ui/icons/ArrowLeftIcon';
import EditableClientMotivation from './sections/ClientMotivation';
import EditableUtilities from './sections/EditableUtilities';
// Seller Components
import EditableHomeWalkthrough from './sections/seller/EditableHomeWalkthrough';
import EditableRenovationList from './sections/seller/EditableRenovationList';
import EditablePropertyInfo from './sections/seller/EditablePropertyInfo';
import EditableListingDetails from './sections/seller/EditableListingDetails';
import EditableListingPaperwork from './sections/seller/EditableListingPaperwork';
import EditableListingPerformance from './sections/seller/EditableListingPerformance';
import EditableMarketingEvents from './sections/seller/EditableMarketingEvents';
import MlsRemarksGenerator from './sections/seller/MlsRemarksGenerator';
import EditableLockboxAssignment from './sections/seller/EditableLockboxAssignment';
import EditableSignInstall from './sections/seller/EditableSignInstall';
import { mockLockboxes } from '../services/mockData';
import CollapsibleSection from './ui/CollapsibleSection';


interface AdminDashboardProps {
    clientData: ClientData;
    onUpdate: (updatedData: ClientData) => void;
    onBack: () => void;
    setView: (view: 'admin' | 'client' | 'settings') => void;
    masterPaperwork: ListingPaperworkTemplate[];
    isReadOnly?: boolean;
    timelineTemplates: {
        buyer: TimelineTemplateEvent[];
        sellerPreList: TimelineTemplateEvent[];
        sellerTransaction: TimelineTemplateEvent[];
    };
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ clientData, onUpdate, onBack, setView, masterPaperwork, isReadOnly = false, timelineTemplates }) => {
  const [isDirty, setIsDirty] = useState(false);

  const buyerPhases: BuyerPhase[] = [
    'Appointment', 'Signed Client', 'Under Contract', 'Closed'
  ];
  
  const sellerPhases: SellerPhase[] = [
    'Appointment', 'Signed Client', 'Live on MLS', 'Under Contract', 'Closed'
  ];

  const createActivityItem = (text: string): ActivityItem => ({
    id: `act-${Date.now()}`,
    timestamp: new Date(),
    text,
  });

  const setDataAndMarkDirty = (newData: ClientData, activityText?: string) => {
    if (activityText) {
        const newActivity = createActivityItem(activityText);
        newData.recentActivity = [newActivity, ...newData.recentActivity];
    }
    onUpdate(newData);
    setIsDirty(true);
  }
  
  const handleBuyerUpdate = <T extends keyof BuyerClientData>(key: T, value: BuyerClientData[T]) => {
    if (clientData.clientType === 'Buyer') {
      setDataAndMarkDirty({ ...clientData, [key]: value });
    }
  };

  const handleSellerUpdate = <T extends keyof SellerClientData>(key: T, value: SellerClientData[T], activityText?: string) => {
    if (clientData.clientType === 'Seller') {
      setDataAndMarkDirty({ ...clientData, [key]: value }, activityText);
    }
  };
  
  const handleHeaderUpdate = (updates: {
    crmLink: string;
    clientEmails: string[];
    clientPhones: string[];
  }) => {
     setDataAndMarkDirty({ ...clientData, ...updates });
  };
  
  const handlePhaseChange = (phase: BuyerPhase | SellerPhase) => {
    setDataAndMarkDirty({ ...clientData, clientPhase: phase as any });
  };

  const handleSaveChanges = () => {
    console.log("Saving data to backend:", clientData);
    alert("Client data saved! (Check console for output)");
    setIsDirty(false);
  }

  const renderBuyerDashboard = () => {
    if (clientData.clientType !== 'Buyer') return null;
    return (
        <>
            <CollapsibleSection title="Home Search Phase">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                     <EditableStrategySessionCard 
                        session={clientData.strategySession} 
                        onUpdate={(session) => handleBuyerUpdate('strategySession', session)}
                        isReadOnly={isReadOnly}
                    />
                    <EditableExploratoryAppointment
                        appointment={clientData.exploratoryAppointment}
                        onUpdate={(appointment) => handleBuyerUpdate('exploratoryAppointment', appointment)}
                        isReadOnly={isReadOnly}
                    />
                     <EditableClientMotivation
                        motivation={clientData.clientMotivation}
                        onUpdate={(motivation) => handleBuyerUpdate('clientMotivation', motivation)}
                        isReadOnly={isReadOnly}
                    />
                    <div className="lg:col-span-3">
                        <EditableSearchCriteriaCard 
                            criteria={clientData.searchCriteria} 
                            onUpdate={(criteria) => handleBuyerUpdate('searchCriteria', criteria)}
                            isReadOnly={isReadOnly}
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <EditableViewedHomes 
                            homes={clientData.viewedHomes}
                            onUpdate={(homes) => handleBuyerUpdate('viewedHomes', homes)}
                            isReadOnly={isReadOnly}
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <EditableOfferPrep
                            clientData={{
                              buyerBookUrl: clientData.buyerBookUrl,
                              buyerBookFile: clientData.buyerBookFile,
                              purchaseAgreementPreviewFile: clientData.purchaseAgreementPreviewFile,
                              content: clientData.offerPrepContent
                            }}
                            onUpdate={(key, value) => handleBuyerUpdate(key as any, value as any)}
                            isReadOnly={isReadOnly}
                        />
                    </div>
                </div>
            </CollapsibleSection>
            
            <CollapsibleSection title="Under Contract Phase">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                    <div className="lg:col-span-3">
                        <EditableTimeline 
                            events={clientData.timeline} 
                            onUpdate={(events) => handleBuyerUpdate('timeline', events)} 
                            isReadOnly={isReadOnly}
                        />
                    </div>
                    <EditableImportantContacts 
                        contacts={clientData.contacts}
                        masterVendorList={clientData.masterVendorList}
                        onUpdate={(contacts) => handleBuyerUpdate('contacts', contacts)}
                        isReadOnly={isReadOnly}
                    />
                    <EditableCoopAgentInfo
                        coopAgent={clientData.coopAgent}
                        transactionCoordinator={clientData.transactionCoordinator}
                        onUpdate={(data) => {
                            if (clientData.clientType === 'Buyer') {
                                setDataAndMarkDirty({
                                    ...clientData,
                                    coopAgent: data.coopAgent,
                                    transactionCoordinator: data.transactionCoordinator
                                })
                            }
                        }}
                        isReadOnly={isReadOnly}
                    />
                     <EditableUtilities
                        utilities={clientData.utilities}
                        onUpdate={(utilities) => handleBuyerUpdate('utilities', utilities)}
                        isReadOnly={isReadOnly}
                    />
                    <EditableDocumentList 
                        documents={clientData.documents}
                        onUpdate={(documents) => handleBuyerUpdate('documents', documents)}
                        isReadOnly={isReadOnly}
                    />
                </div>
            </CollapsibleSection>
        </>
    );
  };

  const renderSellerDashboard = () => {
    if (clientData.clientType !== 'Seller') return null;
    return (
        <>
            <CollapsibleSection title="Listing Strategy & Setup">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                    <EditableStrategySessionCard session={clientData.strategySession} onUpdate={(s) => handleSellerUpdate('strategySession', s)} isReadOnly={isReadOnly} />
                    <EditableHomeWalkthrough walkthrough={clientData.homeWalkthrough} onUpdate={(w) => handleSellerUpdate('homeWalkthrough', w)} isReadOnly={isReadOnly} />
                     <EditableLockboxAssignment 
                        lockboxes={mockLockboxes}
                        assignedLockboxId={clientData.assignedLockboxId}
                        onUpdate={(id) => handleSellerUpdate('assignedLockboxId', id)}
                        isReadOnly={isReadOnly}
                     />
                    <div className="lg:col-span-3">
                        <EditablePropertyInfo propertyInfo={clientData.propertyInfo} onUpdate={(p) => handleSellerUpdate('propertyInfo', p, "Property photos were updated.")} isReadOnly={isReadOnly} />
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Pre-Listing Preparation">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                    <div className="lg:col-span-2 space-y-6">
                       <EditableListingPaperwork 
                          documents={clientData.listingPaperwork} 
                          onUpdate={(d) => handleSellerUpdate('listingPaperwork', d)}
                          masterTemplates={masterPaperwork}
                          isReadOnly={isReadOnly}
                       />
                       <EditableRenovationList tasks={clientData.renovationTasks} onUpdate={(t) => handleSellerUpdate('renovationTasks', t, "A renovation task was updated.")} isReadOnly={isReadOnly} />
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <EditableSignInstall
                            signInstallerInfo={clientData.signInstallerInfo}
                            vendors={clientData.masterVendorList}
                            onUpdate={(info) => handleSellerUpdate('signInstallerInfo', info)}
                            isReadOnly={isReadOnly}
                        />
                        <MlsRemarksGenerator
                            inputs={clientData.mlsGenerationInputs}
                            onUpdateInputs={(inputs) => handleSellerUpdate('mlsGenerationInputs', inputs)}
                            onApplyRemarks={(remarks) => {
                                if (clientData.clientType === 'Seller') {
                                    handleSellerUpdate('listingDetails', { ...clientData.listingDetails, publicRemarks: remarks }, "The MLS remarks have been updated.");
                                }
                            }}
                        />
                    </div>
                     <div className="lg:col-span-3">
                        <EditableListingDetails listingDetails={clientData.listingDetails} onUpdate={(d) => handleSellerUpdate('listingDetails', d)} isReadOnly={isReadOnly} />
                    </div>
                </div>
            </CollapsibleSection>

             <CollapsibleSection title="Live Listing Management">
                <div className="space-y-6 pt-6">
                    <EditableListingPerformance performance={clientData.listingPerformance} onUpdate={(p) => handleSellerUpdate('listingPerformance', p, "Showing feedback was added.")} isReadOnly={isReadOnly} />
                    <EditableMarketingEvents events={clientData.marketingEvents} onUpdate={(e) => handleSellerUpdate('marketingEvents', e, "A new marketing event was added.")} isReadOnly={isReadOnly} />
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Under Contract Phase">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                    <div className="lg:col-span-3">
                        <EditableTimeline events={clientData.underContractTimeline} onUpdate={(t) => handleSellerUpdate('underContractTimeline', t)} isReadOnly={isReadOnly} />
                    </div>
                    <EditableImportantContacts contacts={clientData.contacts} masterVendorList={clientData.masterVendorList} onUpdate={(c) => handleSellerUpdate('contacts', c)} isReadOnly={isReadOnly} />
                    <EditableUtilities utilities={clientData.utilities} onUpdate={(u) => handleSellerUpdate('utilities', u)} isReadOnly={isReadOnly} />
                    <EditableDocumentList documents={clientData.contractDocuments} onUpdate={(d) => handleSellerUpdate('contractDocuments', d)} isReadOnly={isReadOnly} />
                </div>
            </CollapsibleSection>
        </>
    );
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <button onClick={onBack} className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-4">
          <ArrowLeftIcon />
          <span className="ml-2">Back to Client List</span>
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
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
         <div className="mt-4 border-t pt-4 max-w-xs">
            <label htmlFor="client-phase" className="block text-sm font-medium text-slate-700">Client Phase</label>
            <select
                id="client-phase"
                value={clientData.clientPhase}
                onChange={(e) => handlePhaseChange(e.target.value as any)}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                disabled={isReadOnly}
            >
                {(clientData.clientType === 'Buyer' ? buyerPhases : sellerPhases).map(phase => (
                    <option key={phase} value={phase}>{phase}</option>
                ))}
            </select>
        </div>
      </div>
      
      {/* Client Status Header */}
      <div className="mb-8">
        <ClientStatusHeader 
            crmLink={clientData.crmLink}
            clientEmails={clientData.clientEmails}
            clientPhones={clientData.clientPhones}
            onUpdate={handleHeaderUpdate}
            isReadOnly={isReadOnly}
        />
      </div>
      
      <div className="space-y-8">
        {clientData.clientType === 'Buyer' ? renderBuyerDashboard() : renderSellerDashboard()}

        <CollapsibleSection title="Company Settings & Templates">
            <div className="pt-6">
                <BackendFeatures onNavigate={() => setView('settings')} />
            </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default AdminDashboard;