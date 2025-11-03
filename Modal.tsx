
import React, { useEffect } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
    md: 'max-w-3xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
    full: 'h-screen w-screen max-w-none m-0 rounded-none'
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[100] transition-opacity"
      onClick={onClose}
    >
      <div 
        className={`bg-slate-50 rounded-lg shadow-xl w-full relative transform transition-transform scale-95 ${sizeClasses[size]} ${size !== 'full' ? 'm-4' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b bg-white sticky top-0 rounded-t-lg z-10">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
            <CloseIcon />
          </button>
        </div>
        <div className={`p-4 ${size === 'full' ? 'overflow-y-auto h-[calc(100vh-65px)]' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;