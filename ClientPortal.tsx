import React, { useState, useEffect } from 'react';
import { ClientData, ViewedHome, RenovationTask } from '../types';
// Buyer Components
import ClientTimeline from './client/sections/Timeline';
import ClientStrategySessionCard from './client/sections/StrategySession';
import ClientSearchCriteriaCard from './client/sections/SearchCriteria';
import ClientDocumentList from './client/sections/DocumentList';
import ClientImportantContacts from './client/sections/ImportantContacts';
import ClientViewedHomes from './client/sections/ViewedHomes';
import ContractDetails from './client/sections/ContractDetails';
import ClientIntakeFormCard from './client/sections/ClientIntakeFormCard';
import ClientExploratoryAppointmentCard from './client/sections/ExploratoryAppointment';
import OfferPrepSection from './client/sections/OfferPrepSection';
import ClientUtilities from './client/sections/Utilities';
import ClientReminders from './client/sections/Reminders';
import HomeValueCheck from './client/buyer/HomeValueCheck';
// Seller Components
import ClientHomeWalkthrough from './client/seller/HomeWalkthrough';
import ClientPreListingTimeline from './client/seller/PreListingTimeline';
import ClientRenovationList from './client/seller/RenovationList';
import ClientPhotoPrep from './client/seller/PhotoPrep';
import SellerProgressTracker from './client/seller/SellerProgressTracker';
import ListingPaperwork from './client/seller/ListingPaperwork';
import TeamMedia from './client/seller/TeamMedia';
import LiveListingDetails from './client/seller/LiveListingDetails';
import ShowingFeedback from './client/seller/ShowingFeedback';
import ComparableProperties from './client/seller/ComparableProperties';
import MarketingEvents from './client/seller/MarketingEvents';
import OnlinePerformance from './client/seller/OnlinePerformance';
import NotificationFeed from './client/NotificationFeed';
import { BellIcon } from './ui/icons/BellIcon';


interface ClientPortalProps {
    clientData: ClientData;
    onUpdate: (updatedData: ClientData) => void;
}

const CountdownToListDate: React.FC<{ events: any[] }> = ({ events }) => {
    const goLiveEvent = events.find(e => e.title === "Go Live!");
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!goLiveEvent) return;

        const interval = setInterval(() => {
            const goLive_date = new Date(goLiveEvent.date);
            const now = new Date();
            const difference = goLive_date.getTime() - now.getTime();
            
            if (difference < 0) {
                setTimeLeft("We are live!");
                clearInterval(interval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            
            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        }, 1000);

        return () => clearInterval(interval);
    }, [goLiveEvent]);

    if (!goLiveEvent) return null;
    
    const goLive_date = new Date(goLiveEvent.date);

    return (
         <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-sm font-medium text-slate-500">Countdown to List Date</p>
            <p className="text-4xl font-bold text-indigo-600 tracking-tight my-2">{timeLeft}</p>
            <p className="text-sm text-slate-500">{goLive_date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
    );
};


const ClientPortal: React.FC<ClientPortalProps> = ({ clientData, onUpdate }) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const getWelcomeMessage = () => {
    if (clientData.clientType === 'Buyer') {
      switch (clientData.clientPhase) {
          case 'Appointment': return "Welcome! Let's get started on your home buying journey.";
          case 'Signed Client': return "Happy house hunting! Here's a summary of your search progress.";
          case 'Under Contract': return "Congratulations, you're under contract! Here's what's next.";
          case 'Closed':
              const closedDateString = clientData.closedDate 
                  ? ` on ${new Date(clientData.closedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : '';
              return `Congratulations on your new home! You officially closed${closedDateString}.`;
          default: return "Welcome to your personal client portal.";
      }
    } else { // Seller
        switch (clientData.clientPhase) {
            case 'Appointment': return "Welcome! Let's get started on selling your home.";
            case 'Signed Client': return "It's time to prepare your home for the market. Here's our plan.";
            case 'Live on MLS': return "Your home is officially on the market!";
            case 'Under Contract': return "Congratulations, you're under contract!";
            case 'Closed':
                const closedDateString = clientData.closedDate
                    ? ` on ${new Date(clientData.closedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : '';
                return `Congratulations on the successful sale of your home! You officially closed${closedDateString}.`;
            default: return "Welcome to your home selling portal.";
        }
    }
  }

  const renderSellerPortal = () => {
    if (clientData.clientType !== 'Seller') return null;

    const [renovationTasks, setRenovationTasks] = useState(clientData.renovationTasks);

    const handleUpdateTask = (updatedTask: RenovationTask) => {
        const updatedTasks = renovationTasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        );
        setRenovationTasks(updatedTasks);
        onUpdate({ ...clientData, renovationTasks: updatedTasks });
    };

    const SellerHeader = () => (
      <div className="mb-8 p-4 bg-white rounded-xl shadow-md flex flex-col sm:flex-row items-center gap-6">
          <img src={clientData.propertyInfo.primaryPhotoUrl} alt="Property" className="w-full sm:w-48 h-32 object-cover rounded-lg"/>
          <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800">Your Property</h2>
              <p className="text-lg text-slate-600">{clientData.propertyInfo.address}</p>
          </div>
           <div className="flex-shrink-0">
             <ClientImportantContacts contacts={[]} agent={clientData.agent} />
           </div>
      </div>
    );

    if (clientData.clientPhase === 'Appointment') {
      return (
         <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-4 bg-white rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-slate-800">{clientData.propertyInfo.address}</h2>
                    </div>
                    <ClientStrategySessionCard session={clientData.strategySession} />
                    <ClientHomeWalkthrough walkthrough={clientData.homeWalkthrough} />
                </div>
                <div className="lg:col-span-1">
                    <ClientImportantContacts contacts={[]} agent={clientData.agent} />
                </div>
            </div>
            <ListingPaperwork paperwork={clientData.listingPaperwork} />
        </div>
      );
    }
    
    if (clientData.clientPhase === 'Signed Client') {
        return (
            <>
                <SellerHeader />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <ClientPreListingTimeline events={clientData.listingTimeline} />
                        <ClientRenovationList 
                            tasks={renovationTasks} 
                            onUpdateTask={handleUpdateTask}
                        />
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <CountdownToListDate events={clientData.listingTimeline} />
                        <ClientPhotoPrep checklist={clientData.photoPrepContent} />
                        <TeamMedia media={clientData.teamMedia} />
                    </div>
                </div>
            </>
        )
    }

    if (clientData.clientPhase === 'Live on MLS') {
        return (
             <>
                <SellerHeader />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <LiveListingDetails performance={clientData.listingPerformance} />
                        <ShowingFeedback showings={clientData.listingPerformance.showings} />
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <OnlinePerformance totalViews={clientData.listingPerformance.totalViews} />
                        <ComparableProperties properties={clientData.listingPerformance.comparableProperties} compsPortalUrl={clientData.listingPerformance.compsPortalUrl} />
                        <MarketingEvents events={clientData.marketingEvents} />
                    </div>
                </div>
            </>
        );
    }
    
    if (clientData.clientPhase === 'Under Contract') {
        return (
            <>
                <SellerHeader />
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <ClientTimeline events={clientData.underContractTimeline} />
                        <ClientUtilities utilities={clientData.utilities} />
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <ContractDetails property={clientData.contractDetails} />
                        <ClientImportantContacts contacts={clientData.contacts} agent={clientData.agent} />
                        <ClientDocumentList documents={clientData.contractDocuments} title="Contract Documents"/>
                    </div>
                </div>
            </>
        )
    }

    if (clientData.clientPhase === 'Closed') {
        return (
            <>
                <SellerHeader />
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                       <ClientDocumentList documents={clientData.contractDocuments} title="Your Final Documents" />
                       <ClientReminders />
                       <HomeValueCheck />
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <ClientImportantContacts contacts={clientData.contacts} agent={clientData.agent} />
                        <ClientUtilities utilities={clientData.utilities} />
                    </div>
                </div>
            </>
        )
    }

    // Default fallback
    return (
        <>
            <SellerHeader />
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <p className="text-lg text-slate-500">Your portal for the '{clientData.clientPhase}' phase is coming soon!</p>
            </div>
        </>
    );
  };

  const renderBuyerPortal = () => {
    if (clientData.clientType !== 'Buyer') return null;
    
    const handleHomeUpdate = (updatedHome: ViewedHome) => {
        const updatedHomes = clientData.viewedHomes.map(home => 
          home.id === updatedHome.id ? updatedHome : home
        );
        onUpdate({ ...clientData, viewedHomes: updatedHomes });
    };

    if (clientData.clientPhase === 'Closed') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
             <ClientDocumentList documents={clientData.documents} title="Your Final Documents" />
             <ClientReminders />
             <HomeValueCheck />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <ClientImportantContacts contacts={clientData.contacts} agent={clientData.agent} />
            <ClientUtilities utilities={clientData.utilities} />
          </div>
        </div>
      );
    } else if (clientData.clientPhase === 'Under Contract') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <ClientTimeline events={clientData.timeline} />
                <ClientUtilities utilities={clientData.utilities} />
            </div>
            <div className="lg:col-span-1 space-y-6">
                <ContractDetails property={clientData.propertyDetails} />
                <ClientImportantContacts contacts={clientData.contacts} agent={clientData.agent} />
                <ClientDocumentList documents={clientData.documents} title="Contract Documents"/>
            </div>
        </div>
      );
    } else { // Appointment or Signed Client
      return (
        <div className="space-y-8">
            {(clientData.clientPhase === 'Appointment') && (
                <ClientIntakeFormCard url={clientData.intakeFormUrl} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ClientStrategySessionCard session={clientData.strategySession} />
                <ClientExploratoryAppointmentCard appointment={clientData.exploratoryAppointment} />
            </div>
            <ClientSearchCriteriaCard criteria={clientData.searchCriteria} />
            <ClientViewedHomes 
                homes={clientData.viewedHomes}
                onUpdate={handleHomeUpdate}
            />
            <OfferPrepSection
                clientData={clientData}
            />
        </div>
      );
    }
  };

  return (
    <>
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome, {clientData.clientName}!</h1>
            <p className="mt-1 text-lg text-slate-600">
              {getWelcomeMessage()}
            </p>
        </div>
        <button 
            onClick={() => setIsNotificationModalOpen(true)}
            className="relative p-2 rounded-full hover:bg-slate-200 text-slate-600"
            aria-label="View notifications"
        >
            <BellIcon />
            {clientData.recentActivity && clientData.recentActivity.length > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            )}
        </button>
      </div>
      {clientData.clientType === 'Seller' && <SellerProgressTracker phase={clientData.clientPhase} />}
      {clientData.clientType === 'Buyer' ? renderBuyerPortal() : renderSellerPortal()}
    </div>
    <NotificationFeed 
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        activities={clientData.recentActivity}
    />
    </>
  );
};

export default ClientPortal;