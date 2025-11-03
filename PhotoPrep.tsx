
import React, { useState } from 'react';
import Card from '../../ui/Card';
import Modal from '../../ui/Modal';
import { CameraIcon } from '../../ui/icons/CameraIcon';
import { CheckCircleIcon } from '../../ui/icons/CheckCircleIcon';

interface ClientPhotoPrepProps {
  checklist: string[];
}

const ClientPhotoPrep: React.FC<ClientPhotoPrepProps> = ({ checklist }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card title="Photo & Media Prep" icon={<CameraIcon />}>
        <p className="mb-4 text-sm">
          Great photos are key to attracting buyers! Here's how to prepare your home for its photoshoot.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Photo Prep Guide
        </button>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Photo Preparation Checklist">
        <div className="p-4 text-slate-600">
          <p className="mb-4">Follow this guide to ensure your home looks its absolute best for photos.</p>
          <ul className="space-y-3">
            {checklist.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default ClientPhotoPrep;