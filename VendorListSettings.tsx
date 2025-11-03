
import React, { useState } from 'react';
import Card from '../ui/Card';
import { CloseIcon } from '../ui/icons/CloseIcon';
import { Vendor } from '../../types';

const initialVendors: Vendor[] = [
    { id: 'v1', name: "Alice Lender", service: "Lender", company: "Secure Bank", phone: "555-123-4567", email: "alice@securebank.com" },
    { id: 'v2', name: "Larry The Lender", service: "Lender", company: "Mortgage Pro", phone: "555-111-2222", email: "larry@mortgagepro.com" },
    { id: 'v3', name: "Bob Attorney", service: "Attorney", company: "Lawful Closings LLC", phone: "555-987-6543", email: "bob@lawfulclosings.com" },
    { id: 'v4', name: "Charlie Inspector", service: "Inspector", company: "Insight Inspections", phone: "555-555-1212", email: "charlie@insight.com" },
    { id: 'v5', name: "Dana Insurer", service: "Insurance Agent", company: "SafeHome Insurance", phone: "555-222-3333", email: "dana@safehome.com" },
];


const VendorListSettings: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);

  const handleUpdate = (id: string, field: keyof Vendor, value: string) => {
    setVendors(vendors.map(v => v.id === id ? {...v, [field]: value} : v));
  };
  
  const handleAdd = () => {
      const newVendor: Vendor = { id: 'v' + Date.now(), name: '', service: '', company: '', phone: '', email: '' };
      setVendors([...vendors, newVendor]);
  };

  const handleDelete = (id: string) => {
      setVendors(vendors.filter(v => v.id !== id));
  };
  
  const handleSave = () => {
    alert('Vendor list saved! (Check console for output)');
    console.log('Saving vendors:', vendors);
  };

  return (
    <Card title="Manage Vendor List">
        <div className="space-y-4">
            {vendors.map(vendor => (
                <div key={vendor.id} className="p-3 border rounded-lg grid grid-cols-1 md:grid-cols-5 gap-3 relative items-center">
                    <input type="text" placeholder="Vendor Name" value={vendor.name} onChange={e => handleUpdate(vendor.id, 'name', e.target.value)} className="w-full text-sm p-2 border rounded-md"/>
                    <input type="text" placeholder="Service Type" value={vendor.service} onChange={e => handleUpdate(vendor.id, 'service', e.target.value)} className="w-full text-sm p-2 border rounded-md"/>
                    <input type="text" placeholder="Company" value={vendor.company} onChange={e => handleUpdate(vendor.id, 'company', e.target.value)} className="w-full text-sm p-2 border rounded-md"/>
                    <input type="tel" placeholder="Phone Number" value={vendor.phone} onChange={e => handleUpdate(vendor.id, 'phone', e.target.value)} className="w-full text-sm p-2 border rounded-md"/>
                    <input type="email" placeholder="Email Address" value={vendor.email} onChange={e => handleUpdate(vendor.id, 'email', e.target.value)} className="w-full text-sm p-2 border rounded-md"/>
                    <button onClick={() => handleDelete(vendor.id)} className="absolute -top-2 -right-2 p-1 rounded-full bg-white hover:bg-rose-100 text-rose-500 shadow">
                        <CloseIcon />
                    </button>
                </div>
            ))}
        </div>
         <button
            onClick={handleAdd}
            className="w-full mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
        >
            + Add Vendor
        </button>
        <div className="mt-6 text-right">
            <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
            >
                Save Vendors
            </button>
        </div>
    </Card>
  );
};

export default VendorListSettings;