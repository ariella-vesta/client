
import React, { useState } from 'react';
import { ClientData, EducationalContent } from '../../../types';
import Card from '../../ui/Card';
import Modal from '../../ui/Modal';
import { LightBulbIcon } from '../../ui/icons/LightBulbIcon';
import { LinkIcon } from '../../ui/icons/LinkIcon';
import { DocumentTextIcon } from '../../ui/icons/DocumentTextIcon';


interface OfferPrepSectionProps {
  clientData: ClientData;
}

const OfferPrepSection: React.FC<OfferPrepSectionProps> = ({ clientData }) => {
    const [modalContent, setModalContent] = useState<EducationalContent | null>(null);

    if (clientData.clientType !== 'Buyer') {
        return null; 
    }
    
    const { buyerBookUrl, buyerBookFile, purchaseAgreementPreviewFile, offerPrepContent: content } = clientData;

    return (
        <>
            <Card title="Ready to Write an Offer?" icon={<LightBulbIcon />}>
                <p className="mb-6 text-sm">Understanding the next steps is key to a successful purchase. Review these resources to feel confident when you're ready to make an offer.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-slate-700">Learn the Process</h4>
                        {content.map(item => (
                             <button
                                key={item.id}
                                onClick={() => setModalContent(item)}
                                className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors"
                            >
                                <p className="font-semibold text-indigo-600">{item.title}</p>
                            </button>
                        ))}
                    </div>
                    <div className="space-y-3">
                         <h4 className="font-semibold text-slate-700">Key Documents</h4>
                        {buyerBookUrl && (
                            <a href={buyerBookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors font-semibold text-slate-700">
                                <LinkIcon /> <span className="ml-2">Download our Buyer Book (URL)</span>
                            </a>
                        )}
                        {buyerBookFile && (
                            <a href={buyerBookFile.url} download={buyerBookFile.name} className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors font-semibold text-slate-700">
                               <DocumentTextIcon /> <span className="ml-2">Download our Buyer Book (File)</span>
                            </a>
                        )}
                        {purchaseAgreementPreviewFile && (
                            <a href={purchaseAgreementPreviewFile.url} download={purchaseAgreementPreviewFile.name} className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors font-semibold text-slate-700">
                               <DocumentTextIcon /> <span className="ml-2">Preview a Purchase Agreement</span>
                            </a>
                        )}
                    </div>
                </div>
            </Card>

            <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)} title={modalContent?.title || ''}>
                {modalContent && (
                <div className="p-4 space-y-4">
                    <p className="text-slate-600 leading-relaxed">{modalContent.description}</p>
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                        src={modalContent.videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                        style={{ height: '45vh' }}
                        ></iframe>
                    </div>
                </div>
                )}
            </Modal>
        </>
    );
};

export default OfferPrepSection;