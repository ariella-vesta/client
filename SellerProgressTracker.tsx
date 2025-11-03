
import React from 'react';
import { SellerPhase } from '../../../types';

interface SellerProgressTrackerProps {
  phase: SellerPhase;
}

const SellerProgressTracker: React.FC<SellerProgressTrackerProps> = ({ phase }) => {
  const steps = ['Listing Prep', 'Listing Live', 'Under Contract', 'Closed'];
  
  let currentStepIndex = 0;
  switch (phase) {
    case 'Appointment':
    case 'Signed Client':
      currentStepIndex = 0;
      break;
    case 'Live on MLS':
      currentStepIndex = 1;
      break;
    case 'Under Contract':
      currentStepIndex = 2;
      break;
    case 'Closed':
      currentStepIndex = 3;
      break;
  }

  return (
    <div className="mb-8 p-4 bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Your Selling Journey</h3>
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${index <= currentStepIndex ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                {index < currentStepIndex ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <p className={`mt-2 text-xs text-center font-semibold ${index <= currentStepIndex ? 'text-indigo-600' : 'text-slate-500'}`}>{step}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${index < currentStepIndex ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SellerProgressTracker;