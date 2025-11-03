
import React, { useMemo } from 'react';
import { RenovationTask, UploadedFile } from '../../../types';
import Card from '../../ui/Card';
import { PaintBrushIcon } from '../../ui/icons/PaintBrushIcon';
import { UploadIcon } from '../../ui/icons/UploadIcon';
import { LinkIcon } from '../../ui/icons/LinkIcon';

interface ClientRenovationListProps {
  tasks: RenovationTask[];
  onUpdateTask: (updatedTask: RenovationTask) => void;
}

const ClientRenovationList: React.FC<ClientRenovationListProps> = ({ tasks, onUpdateTask }) => {

  const groupedTasks = useMemo(() => {
    return tasks.reduce((acc, task) => {
      (acc[task.category] = acc[task.category] || []).push(task);
      return acc;
    }, {} as Record<string, RenovationTask[]>);
  }, [tasks]);

  const handleInvoiceUpload = (task: RenovationTask, file: File | null) => {
      if (file) {
          const newFile: UploadedFile = { name: file.name, url: URL.createObjectURL(file) };
          onUpdateTask({ ...task, invoice: newFile });
      }
  };

  const responsibilityColors: Record<string, string> = {
    'Agent': 'bg-blue-100 text-blue-800',
    'Contractor': 'bg-purple-100 text-purple-800',
    'Homeowner': 'bg-green-100 text-green-800',
  };

  return (
    <Card title="Pre-Listing Renovation List" icon={<PaintBrushIcon />}>
      {Object.entries(groupedTasks).map(([category, tasksInCategory]) => (
        <div key={category} className="mb-6">
          <h4 className="font-bold text-slate-700 text-lg mb-2">{category}</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="w-16 px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Done</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Task</th>
                  <th className="w-40 px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Responsibility</th>
                  <th className="w-40 px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Invoice</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {tasksInCategory.map(task => (
                  <tr key={task.id} className={`${task.isComplete ? 'bg-green-50' : ''}`}>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={task.isComplete}
                        onChange={() => onUpdateTask({ ...task, isComplete: !task.isComplete })}
                        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                        <div className="flex items-center">
                            {task.photo && <img src={task.photo.url} alt="Task" className="h-10 w-10 rounded object-cover mr-3" />}
                            <span className={`text-slate-700 ${task.isComplete ? 'line-through text-slate-500' : ''}`}>
                                {task.task}
                            </span>
                        </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={task.responsibleParty}
                        onChange={(e) => onUpdateTask({ ...task, responsibleParty: e.target.value as RenovationTask['responsibleParty']})}
                        className={`w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5 px-2 font-semibold text-xs leading-5 ${responsibilityColors[task.responsibleParty]}`}
                      >
                        <option>Homeowner</option>
                        <option>Agent</option>
                        <option>Contractor</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                        {task.invoice ? (
                            <a href={task.invoice.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-indigo-600 font-semibold hover:underline">
                                <LinkIcon /> <span className="ml-1.5 truncate">{task.invoice.name}</span>
                            </a>
                        ) : (
                            <>
                                <label htmlFor={`invoice-upload-${task.id}`} className="cursor-pointer inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 font-semibold">
                                   <UploadIcon className="h-4 w-4 mr-1" /> Upload
                                </label>
                                <input type="file" id={`invoice-upload-${task.id}`} className="sr-only" onChange={e => handleInvoiceUpload(task, e.target.files ? e.target.files[0] : null)} />
                            </>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default ClientRenovationList;