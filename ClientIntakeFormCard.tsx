
import React from 'react';
import Card from '../../ui/Card';
import { PencilSquareIcon } from '../../ui/icons/PencilSquareIcon';

interface ClientIntakeFormCardProps {
  url: string;
}

const ClientIntakeFormCard: React.FC<ClientIntakeFormCardProps> = ({ url }) => {
  return (
    <div className="bg-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
                <div className="bg-white p-3 rounded-full mr-4">
                    <PencilSquareIcon />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Your First Step: Client Intake Form</h3>
                    <p className="opacity-90">Please fill this out so we can tailor our search to your needs.</p>
                </div>
            </div>
            <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 md:mt-0 flex-shrink-0 px-6 py-2 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-colors shadow-md"
            >
                Start Form
            </a>
        </div>
    </div>
  );
};

export default ClientIntakeFormCard;