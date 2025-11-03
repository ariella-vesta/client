
import React, { useState } from 'react';
import { RenovationTask, UploadedFile } from '../../../types';
import { CloseIcon } from '../../ui/icons/CloseIcon';
import { PaintBrushIcon } from '../../ui/icons/PaintBrushIcon';
import { LinkIcon } from '../../ui/icons/LinkIcon';
import { CameraIcon } from '../../ui/icons/CameraIcon';
import { SparklesIcon } from '../../ui/icons/SparklesIcon';
import { GoogleGenAI, Type } from '@google/genai';

interface EditableRenovationListProps {
  tasks: RenovationTask[];
  onUpdate: (updatedTasks: RenovationTask[]) => void;
  isReadOnly?: boolean;
}

const EditableRenovationList: React.FC<EditableRenovationListProps> = ({ tasks, onUpdate, isReadOnly = false }) => {
  const [loadingAiTaskId, setLoadingAiTaskId] = useState<string | null>(null);

  const handleTaskChange = (id: string, updatedTask: Partial<RenovationTask>) => {
    onUpdate(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };
  
  const handlePhotoUpload = (id: string, file: File | null) => {
    if (file) {
      const newFile: UploadedFile = { name: file.name, url: URL.createObjectURL(file) };
      handleTaskChange(id, { photo: newFile });
    }
  };

  const handleInvoiceUpload = (id: string, file: File | null) => {
    if (file) {
      const newFile: UploadedFile = { name: file.name, url: URL.createObjectURL(file) };
      handleTaskChange(id, { invoice: newFile });
    }
  };
  
  const handleAiAnalyze = async (task: RenovationTask) => {
    if (!task.photo || !process.env.API_KEY) {
      alert("Please upload a photo first and ensure API key is set.");
      return;
    }
    setLoadingAiTaskId(task.id);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await fetch(task.photo.url);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        const base64Data = (event.target?.result as string).split(',')[1];
        
        const imagePart = {
          inlineData: { mimeType: blob.type, data: base64Data },
        };
        const textPart = {
            text: "Analyze this image of a room or area in a house. Identify the primary object that needs repair or improvement. Suggest a concise task for a renovation checklist and a one-word category for it (e.g., Plumbing, Electrical, Cosmetic, Flooring, Kitchen, Bathroom). Format the response as JSON with 'task' and 'category' keys. For example: {\"task\": \"Repaint scuffed wall\", \"category\": \"Cosmetic\"}"
        };

        try {
            const result = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: { parts: [imagePart, textPart] },
              config: {
                responseMimeType: 'application/json',
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    task: { type: Type.STRING },
                    category: { type: Type.STRING }
                  }
                }
              }
            });

            const jsonString = result.text.trim();
            const parsed = JSON.parse(jsonString);
            
            handleTaskChange(task.id, { task: parsed.task || 'AI suggestion failed', category: parsed.category || 'General' });

        } catch(e) {
            console.error("AI analysis failed", e);
            alert("AI analysis failed. Please check console for details.");
        } finally {
            setLoadingAiTaskId(null);
        }
      };
      
      reader.readAsDataURL(blob);

    } catch (e) {
      console.error("Error fetching blob or reading file", e);
      setLoadingAiTaskId(null);
    }
  };

  const handleAddTask = () => {
    const newTask: RenovationTask = {
      id: 'rt' + Date.now(),
      task: 'New Task',
      isComplete: false,
      category: 'General',
      responsibleParty: 'Homeowner',
    };
    onUpdate([...tasks, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    onUpdate(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-slate-800 tracking-wide flex items-center mb-4"><PaintBrushIcon /><span className="ml-2">Pre-Listing Renovations</span></h3>
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="p-3 border rounded-lg bg-slate-50 relative">
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-1 flex justify-center">
                <input
                  type="checkbox"
                  checked={task.isComplete}
                  onChange={e => handleTaskChange(task.id, { isComplete: e.target.checked })}
                  disabled={isReadOnly}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:cursor-not-allowed"
                />
              </div>
              <div className="col-span-11 md:col-span-4">
                <input
                  type="text"
                  placeholder="Task Description"
                  value={task.task}
                  onChange={e => handleTaskChange(task.id, { task: e.target.value })}
                  disabled={isReadOnly}
                  className={`w-full p-2 border rounded-md bg-white ${task.isComplete ? 'line-through text-slate-500' : ''} disabled:bg-slate-100 disabled:cursor-not-allowed`}
                />
              </div>
               <div className="col-span-6 md:col-span-2">
                <input
                  type="text"
                  placeholder="Category"
                  value={task.category}
                  onChange={e => handleTaskChange(task.id, { category: e.target.value })}
                  disabled={isReadOnly}
                  className="w-full p-2 border rounded-md bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>
              <div className="col-span-6 md:col-span-2">
                <select
                  value={task.responsibleParty}
                  onChange={(e) => handleTaskChange(task.id, { responsibleParty: e.target.value as RenovationTask['responsibleParty'] })}
                  disabled={isReadOnly}
                  className="w-full p-2 border rounded-md bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option>Homeowner</option>
                  <option>Agent</option>
                  <option>Contractor</option>
                </select>
              </div>
              <div className="col-span-12 md:col-span-3 flex justify-end">
                {!isReadOnly && (
                  <button onClick={() => handleDeleteTask(task.id)} className="p-1 rounded-full hover:bg-rose-100 text-rose-500">
                    <CloseIcon />
                  </button>
                )}
              </div>
            </div>
             <div className="mt-2 pl-8 flex items-center gap-4">
                {task.photo ? (
                    <img src={task.photo.url} alt="Renovation task" className="h-16 w-16 object-cover rounded-md" />
                ) : (
                    <div className="h-16 w-16 bg-slate-200 rounded-md flex items-center justify-center text-slate-400">
                        <CameraIcon />
                    </div>
                )}
                <div>
                     {!isReadOnly && (
                        <>
                         <label htmlFor={`photo-upload-${task.id}`} className="cursor-pointer text-sm text-indigo-600 font-semibold hover:underline">
                            {task.photo ? 'Change Photo' : 'Upload Photo'}
                        </label>
                        <input type="file" id={`photo-upload-${task.id}`} className="sr-only" onChange={e => handlePhotoUpload(task.id, e.target.files ? e.target.files[0] : null)} accept="image/*"/>
                        <button 
                            onClick={() => handleAiAnalyze(task)} 
                            disabled={!task.photo || loadingAiTaskId === task.id}
                            className="ml-4 inline-flex items-center text-sm text-indigo-600 font-semibold disabled:text-slate-400 disabled:cursor-not-allowed"
                        >
                            <SparklesIcon /> <span className="ml-1">{loadingAiTaskId === task.id ? 'Analyzing...' : 'Analyze with AI'}</span>
                        </button>
                        </>
                     )}
                </div>
                 <div className="ml-auto">
                    {task.invoice ? (
                        <a href={task.invoice.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-green-600 font-semibold hover:underline">
                          <LinkIcon /> <span className="ml-1.5 truncate">View Invoice</span>
                        </a>
                    ) : !isReadOnly && (
                        <>
                           <label htmlFor={`invoice-upload-${task.id}`} className="cursor-pointer inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 font-semibold">
                               <LinkIcon /> <span className="ml-1.5">Attach Invoice</span>
                           </label>
                            <input type="file" id={`invoice-upload-${task.id}`} className="sr-only" onChange={e => handleInvoiceUpload(task.id, e.target.files ? e.target.files[0] : null)} />
                        </>
                    )}
                </div>
            </div>
          </div>
        ))}
      </div>
       {!isReadOnly && (
        <button
          onClick={handleAddTask}
          className="w-full mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
        >
          + Add Task
        </button>
       )}
    </div>
  );
};

export default EditableRenovationList;