
import React, { useState } from 'react';
import { Contact, Vendor } from '../../types';
import Modal from '../ui/Modal';

interface EditableImportantContactsProps {
  contacts: Contact[];
  masterVendorList: Vendor[];
  onUpdate: (updatedContacts: Contact[]) => void;
  isReadOnly?: boolean;
}

const EditableImportantContacts: React.FC<EditableImportantContactsProps> = ({ contacts, masterVendorList, onUpdate, isReadOnly = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactChange = (id: string, field: keyof Contact, value: string) => {
    const updatedContacts = contacts.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    );
    onUpdate(updatedContacts);
  };

  const handleAddContactsFromVendorList = (selectedVendors: Vendor[]) => {
    const newContacts: Contact[] = selectedVendors.map(v => ({
      id: 'c' + Date.now() + v.id,
      name: v.name,
      role: v.service,
      company: v.company,
      phone: v.phone,
      email: v.email,
    }));
    onUpdate([...contacts, ...newContacts]);
    setIsModalOpen(false);
  };

  const handleDeleteContact = (id: string) => {
    onUpdate(contacts.filter(c => c.id !== id));
  };

  return (
    <>
      <div>
        <h3 className="text-xl font-semibold text-slate-800 tracking-wide mb-4">Your Team</h3>
        <div className="space-y-4">
          {contacts.map(contact => (
            <div key={contact.id} className="p-3 border rounded-md relative space-y-2 bg-slate-50">
              {!isReadOnly && (
                <button onClick={() => handleDeleteContact(contact.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-rose-100 text-rose-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
              <input type="text" placeholder="Name" value={contact.name} onChange={e => handleContactChange(contact.id, 'name', e.target.value)} disabled={isReadOnly} className="w-full text-sm font-medium p-1 border-b disabled:bg-slate-100 disabled:cursor-not-allowed"/>
              <input type="text" placeholder="Role" value={contact.role} onChange={e => handleContactChange(contact.id, 'role', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-1 border-b disabled:bg-slate-100 disabled:cursor-not-allowed"/>
              <input type="text" placeholder="Company" value={contact.company} onChange={e => handleContactChange(contact.id, 'company', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-1 border-b disabled:bg-slate-100 disabled:cursor-not-allowed"/>
              <input type="tel" placeholder="Phone" value={contact.phone} onChange={e => handleContactChange(contact.id, 'phone', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-1 border-b disabled:bg-slate-100 disabled:cursor-not-allowed"/>
              <input type="email" placeholder="Email" value={contact.email} onChange={e => handleContactChange(contact.id, 'email', e.target.value)} disabled={isReadOnly} className="w-full text-sm p-1 border-b disabled:bg-slate-100 disabled:cursor-not-allowed"/>
            </div>
          ))}
          {!isReadOnly && (
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-md hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                + Add From Vendor List
            </button>
          )}
        </div>
      </div>
      <VendorSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vendors={masterVendorList}
        onAdd={handleAddContactsFromVendorList}
      />
    </>
  );
};

// Vendor Selection Modal Component
const VendorSelectionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  vendors: Vendor[];
  onAdd: (selectedVendors: Vendor[]) => void;
}> = ({ isOpen, onClose, vendors, onAdd }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleSelect = (vendorId: string) => {
    const newSelection = new Set(selected);
    if (newSelection.has(vendorId)) {
      newSelection.delete(vendorId);
    } else {
      newSelection.add(vendorId);
    }
    setSelected(newSelection);
  };
  
  const handleSubmit = () => {
    const selectedVendors = vendors.filter(v => selected.has(v.id));
    onAdd(selectedVendors);
    setSelected(new Set()); // Reset selection after adding
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Vendors to Add">
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-slate-200">
          {vendors.map(vendor => (
            <li key={vendor.id} className="p-3 flex items-center justify-between hover:bg-slate-50">
              <div>
                <p className="font-semibold text-slate-800">{vendor.name}</p>
                <p className="text-sm text-indigo-600">{vendor.service} {vendor.company && `- ${vendor.company}`}</p>
                <p className="text-sm text-slate-500">{vendor.phone}</p>
              </div>
              <input
                type="checkbox"
                checked={selected.has(vendor.id)}
                onChange={() => handleSelect(vendor.id)}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={selected.size === 0}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Add {selected.size > 0 ? selected.size : ''} Contact{selected.size !== 1 && 's'}
        </button>
      </div>
    </Modal>
  );
};

export default EditableImportantContacts;