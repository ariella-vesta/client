
import React, { useState } from 'react';
import { ListingPaperwork as ListingPaperworkType, UploadedFile } from '../../../types';
import Card from '../../ui/Card';
import Modal from '../../ui/Modal';
import { DocumentTextIcon } from '../../ui/icons/DocumentTextIcon';
import { EyeIcon } from '../../ui/icons/EyeIcon';
import { VideoIcon } from '../../ui/icons/VideoIcon';

interface ListingPaperworkProps {
  paperwork: ListingPaperworkType[];
}

const ListingPaperwork: React.FC<ListingPaperworkProps> = ({ paperwork }) => {
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const openVideoModal = (url: string) => {
    if (url.includes("watch?v=")) {
      const videoId = url.split("v=")[1];
      setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setVideoUrl(url);
    }
  }

  return (
    <>
      <Card title="Step 4: Let's Make It Official - Paperwork" icon={<DocumentTextIcon />}>
        <p className="mb-4 text-sm">
          Understanding these key documents is the first step to a smooth and successful sale. We've prepared these resources to help guide you.
        </p>
        <div className="space-y-4">
          {paperwork.map(doc => (
            <div key={doc.id} className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-bold text-slate-800">{doc.title}</h4>
              <p className="text-sm text-slate-600 my-2">{doc.description}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {doc.previewFile && (
                  <button
                    onClick={() => setPreviewFile(doc.previewFile!)}
                    className="inline-flex items-center px-3 py-1.5 bg-white text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-100 border border-slate-300 transition-colors"
                  >
                    <EyeIcon />
                    <span className="ml-2">Preview Document</span>
                  </button>
                )}
                {doc.videoUrl && (
                  <button
                    onClick={() => openVideoModal(doc.videoUrl)}
                    className="inline-flex items-center px-3 py-1.5 bg-white text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-100 border border-slate-300 transition-colors"
                  >
                    <VideoIcon />
                    <span className="ml-2">Watch Explainer</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Document Preview Modal */}
      <Modal isOpen={!!previewFile} onClose={() => setPreviewFile(null)} title={previewFile?.name || 'Document Preview'}>
        {previewFile && (
          <div style={{ width: '100%', height: '75vh' }}>
            <iframe src={previewFile.url} title={previewFile.name} width="100%" height="100%" style={{ border: 'none' }} />
          </div>
        )}
      </Modal>

      {/* Video Preview Modal */}
      <Modal isOpen={!!videoUrl} onClose={() => setVideoUrl(null)} title="Explainer Video">
        {videoUrl && (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
              style={{ height: '50vh' }}
            ></iframe>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ListingPaperwork;