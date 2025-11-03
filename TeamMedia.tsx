
import React from 'react';
import { TeamMedia as TeamMediaType } from '../../../types';
import Card from '../../ui/Card';
import { CameraIcon } from '../../ui/icons/CameraIcon';
import { LinkIcon } from '../../ui/icons/LinkIcon';

interface TeamMediaProps {
  media: TeamMediaType;
}

const TeamMedia: React.FC<TeamMediaProps> = ({ media }) => {
  return (
    <Card title="Media from Our Team" icon={<CameraIcon />}>
      <p className="mb-4 text-sm">
        Here's a preview of the marketing materials we're creating to showcase your home.
      </p>
      <div className="space-y-4">
        <div>
            <h4 className="font-semibold text-slate-800">Drafted MLS Remarks</h4>
            <p className="mt-1 text-sm text-slate-600 p-3 bg-slate-50 rounded-md italic">
                "{media.mlsRemarks}"
            </p>
        </div>
        <div>
            <h4 className="font-semibold text-slate-800">Media Links</h4>
             <div className="flex flex-col space-y-2 pt-2">
                <a href={media.photosUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                    <LinkIcon /> <span className="ml-2">View Photo Gallery</span>
                </a>
                <a href={media.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                    <LinkIcon /> <span className="ml-2">Watch Property Video</span>
                </a>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default TeamMedia;