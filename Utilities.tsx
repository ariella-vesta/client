
import React from 'react';
import { Utility } from '../../../types';
import Card from '../../ui/Card';
import { LinkIcon } from '../../ui/icons/LinkIcon';
import { WrenchScrewdriverIcon } from '../../ui/icons/WrenchScrewdriverIcon';

interface ClientUtilitiesProps {
  utilities: Utility[];
}

const ClientUtilities: React.FC<ClientUtilitiesProps> = ({ utilities }) => {
  return (
    <Card title="Utilities Setup" icon={<WrenchScrewdriverIcon />}>
      <p className="mb-4 text-sm">Here are some helpful links to set up utilities for your new home.</p>
      <ul className="space-y-2">
        {utilities.map(util => (
          <li key={util.id}>
            <a
              href={util.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors"
            >
              <span className="font-semibold text-slate-800">{util.name}</span>
              <LinkIcon />
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ClientUtilities;