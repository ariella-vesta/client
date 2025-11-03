import React, { useState, useMemo } from 'react';
import { ClientData, ClientType, BuyerPhase, SellerPhase, InvitationTemplates } from '../types';
import { LinkIcon } from './ui/icons/LinkIcon';
import Modal from './ui/Modal';
import { PlusCircleIcon } from './ui/icons/PlusCircleIcon';
import AtAGlanceSummary from './admin/AtAGlanceSummary';
import { CogIcon } from './ui/icons/CogIcon';
import { TrashIcon } from './ui/icons/TrashIcon';

interface ClientListProps {
  clients: ClientData[];
  onSelectClient: (id: string) => void;
  onAddClient: (details: { name: string, type: ClientType, crmLink: string, email: string, phone: string }) => ClientData;
  setView: (view: 'admin' | 'client' | 'settings') => void;
  onUpdateClient: (client: ClientData) => void;
  onDeleteClient: (clientId: string) => void;
  invitationTemplates: InvitationTemplates;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onSelectClient, onAddClient, setView, onUpdateClient, onDeleteClient, invitationTemplates }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [newClientDetails, setNewClientDetails] = useState({ name: '', type: 'Buyer' as ClientType, crmLink: '', email: '', phone: '' });
  const [justAddedClient, setJustAddedClient] = useState<ClientData | null>(null);

  const handleAddClient = () => {
    if (newClientDetails.name.trim()) {
        const newClient = onAddClient(newClientDetails);
        setIsAddModalOpen(false);
        setNewClientDetails({ name: '', type: 'Buyer', crmLink: '', email: '', phone: '' });
        setJustAddedClient(newClient);
        setIsInviteModalOpen(true);
    }
  };

  const handlePhaseChange = (client: ClientData, newPhase: string) => {
    if (client.clientType === 'Buyer') {
      onUpdateClient({ ...client, clientPhase: newPhase as BuyerPhase });
    } else {
      onUpdateClient({ ...client, clientPhase: newPhase as SellerPhase });
    }
  };

  const handleDelete = (clientId: string, clientName: string) => {
    if (window.confirm(`Are you sure you want to delete the portal for ${clientName}? This action cannot be undone.`)) {
      onDeleteClient(clientId);
    }
  };

  const groupedClients = useMemo(() => {
    return clients.reduce((acc, client) => {
      const phase = client.clientPhase;
      (acc[phase] = acc[phase] || []).push(client);
      return acc;
    }, {} as Record<string, ClientData[]>);
  }, [clients]);

  const phaseOrder: (BuyerPhase | SellerPhase)[] = [
    'Appointment', 
    'Signed Client', 
    'Live on MLS',
    'Under Contract',
    'Closed'
  ];

  const sortedGroupedClients = Object.entries(groupedClients).sort(([phaseA], [phaseB]) => {
      return phaseOrder.indexOf(phaseA as any) - phaseOrder.indexOf(phaseB as any);
  });
  
  const getPhaseOptions = (type: ClientType): (BuyerPhase[] | SellerPhase[]) => {
      const buyerPhases: BuyerPhase[] = ['Appointment', 'Signed Client', 'Under Contract', 'Closed'];
      const sellerPhases: SellerPhase[] = ['Appointment', 'Signed Client', 'Live on MLS', 'Under Contract', 'Closed'];
      return type === 'Buyer' ? buyerPhases : sellerPhases;
  }

  const getInvitationContent = (type: 'email' | 'text') => {
      if (!justAddedClient) return '';
      const template = invitationTemplates[justAddedClient.clientType.toLowerCase() as 'buyer' | 'seller'][type];
      return template
        .replace('[Client Name]', justAddedClient.clientName)
        .replace('[Agent Name]', justAddedClient.agent.name)
        .replace('[Portal Link]', window.location.href);
  };


  return (
    <>
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">All Clients</h1>
            <p className="mt-1 text-lg text-slate-600">A pipeline view of all your buyers and sellers.</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button
                onClick={() => setView('settings')}
                className="inline-flex items-center px-4 py-2 bg-white text-slate-700 font-semibold rounded-md shadow-sm border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <CogIcon />
                <span className="ml-2">Company Settings</span>
            </button>
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <PlusCircleIcon />
                <span className="ml-2">Add New Client</span>
            </button>
          </div>
        </div>
        
        <AtAGlanceSummary clients={clients} />

        <div className="mt-8 space-y-8">
            {sortedGroupedClients.map(([phase, clientsInPhase]) => (
                <div key={phase}>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">{phase} ({clientsInPhase.length})</h2>
                     <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit Phase</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CRM</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clientsInPhase.map(client => (
                                        <tr key={client.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button onClick={() => onSelectClient(client.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-900">{client.clientName}</button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${client.clientType === 'Buyer' ? 'bg-sky-100 text-sky-800' : 'bg-rose-100 text-rose-800'}`}>{client.clientType}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                 <select value={client.clientPhase} onChange={e => handlePhaseChange(client, e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs py-1">
                                                    {getPhaseOptions(client.clientType).map(p => <option key={p} value={p}>{p}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <a href={client.crmLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:text-indigo-800"><LinkIcon /></a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button onClick={() => handleDelete(client.id, client.clientName)} className="p-1 text-gray-400 hover:text-red-600"><TrashIcon /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Client">
        <div className="space-y-4">
            <div>
                <label htmlFor="client-name" className="block text-sm font-medium text-slate-700">Client Name</label>
                <input type="text" id="client-name" value={newClientDetails.name} onChange={(e) => setNewClientDetails({...newClientDetails, name: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm" placeholder="e.g., Jane Doe" />
            </div>
             <div>
                <label htmlFor="client-type" className="block text-sm font-medium text-slate-700">Client Type</label>
                <select id="client-type" value={newClientDetails.type} onChange={(e) => setNewClientDetails({...newClientDetails, type: e.target.value as ClientType})} className="mt-1 block w-full py-2 border-gray-300 sm:text-sm rounded-md">
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                </select>
            </div>
            <div>
                <label htmlFor="crm-link" className="block text-sm font-medium text-slate-700">CRM Link</label>
                <input type="url" id="crm-link" value={newClientDetails.crmLink} onChange={(e) => setNewClientDetails({...newClientDetails, crmLink: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm" placeholder="https://www.followupboss.com/..." />
            </div>
            <div>
                <label htmlFor="client-email" className="block text-sm font-medium text-slate-700">Primary Email</label>
                <input type="email" id="client-email" value={newClientDetails.email} onChange={(e) => setNewClientDetails({...newClientDetails, email: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm" placeholder="jane@email.com" />
            </div>
            <div>
                <label htmlFor="client-phone" className="block text-sm font-medium text-slate-700">Primary Phone</label>
                <input type="tel" id="client-phone" value={newClientDetails.phone} onChange={(e) => setNewClientDetails({...newClientDetails, phone: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm" placeholder="555-123-4567" />
            </div>
        </div>
        <div className="mt-6 flex justify-end">
            <button onClick={handleAddClient} disabled={!newClientDetails.name.trim()} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-slate-400">
              Create Client
            </button>
        </div>
    </Modal>
    <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title={`Invite ${justAddedClient?.clientName}`}>
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold">Email Invitation Preview</h3>
                <p className="text-sm p-3 bg-slate-100 rounded-md whitespace-pre-wrap">{getInvitationContent('email')}</p>
                 <button onClick={() => { alert(`Email invitation sent to ${justAddedClient?.clientEmails[0]}`); setIsInviteModalOpen(false); }} className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 text-sm">
                    Send Email Invitation
                </button>
            </div>
            <div>
                <h3 className="font-semibold">Text Invitation Preview</h3>
                <p className="text-sm p-3 bg-slate-100 rounded-md whitespace-pre-wrap">{getInvitationContent('text')}</p>
                <button onClick={() => { alert(`Text invitation sent to ${justAddedClient?.clientPhones[0]}`); setIsInviteModalOpen(false); }} className="mt-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 text-sm">
                    Send Text Invitation
                </button>
            </div>
        </div>
    </Modal>
    </>
  );
};

export default ClientList;