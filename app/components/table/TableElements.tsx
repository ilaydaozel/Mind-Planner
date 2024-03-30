import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, CheckIcon } from "@heroicons/react/16/solid";
import { handleApiResponse } from '@/app/utils/Helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditableField = ({ initialValue, onSave }: { initialValue: string, onSave: (newValue: string) => void }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(initialValue);

  const handleSaveField = () => {
    onSave(editedValue);
    setEditMode(false);
  };

  return (
    <div className='px-6 py-4 whitespace-nowrap'>
      {editMode ? (
        <div className='flex gap-2'>
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className='border border-secondary-300 border-1'
          />
          <button onClick={handleSaveField} className='bg-secondary-200 rounded-md p-1'><CheckIcon className='h-3 w-3 cursor-pointer'/></button>
        </div>
      ) : (
        <div className='flex gap-2 items-center'>
          {initialValue}
          <PencilIcon
            className="h-3 w-3 cursor-pointer text-secondary-800"
            onClick={() => setEditMode(true)}
          />
        </div>
      )}
    </div>
  );
};

export const Th = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </div>
  );
};


export const ProgramTableRow = ({ program, showNotesForProgram, toggleAdditionalNotes }: { program: IProgram, showNotesForProgram: string | null, toggleAdditionalNotes: (programId: string) => void }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);

  const handleEditField = async (fieldName: string, fieldValue: any) => {
    const id = program.id || "";
    try {
      await handleApiResponse(
        axios.put(
          `/api/program/updateProgram`,
          { id, fieldName, fieldValue }
        ),
        router,
        "Update successful"
      );
      console.log('Field updated successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };


  return (
    <tr key={program.id}>
      <div className='w-full flex'>
        <EditableField
          initialValue={program.name}
          onSave={(newValue) => handleEditField("name", newValue)}
        />
        <EditableField
          initialValue={program.universityName}
          onSave={(newValue) => handleEditField("universityName", newValue)}
        />
        <EditableField
          initialValue={program.universityCity}
          onSave={(newValue) => handleEditField("universityCity", newValue)}
        />
        <EditableField
          initialValue={program.programLink}
          onSave={(newValue) => handleEditField("programLink", newValue)}
        />
        <EditableField
          initialValue={program.courseContent}
          onSave={(newValue) => handleEditField("courseContent", newValue)}
        />
        <EditableField
          initialValue={program.requirements}
          onSave={(newValue) => handleEditField("requirements", newValue)}
        />
        <EditableField
          initialValue={program.language}
          onSave={(newValue) => handleEditField("language", newValue)}
        />
        <EditableField
          initialValue={program.applicationDeadline}
          onSave={(newValue) => handleEditField("applicationDeadline", newValue)}
        />
        <EditableField
          initialValue={program.applicationDocuments}
          onSave={(newValue) => handleEditField("applicationDocuments", newValue)}
        />
      </div>
      <button
        onClick={() => toggleAdditionalNotes(program.id || "")}
        className="text-primary-500 cursor-pointer flex items-center space-x-1"
      >
        {showNotesForProgram === program.id ? <ChevronUpIcon className="h-4 w-4"/> : <ChevronDownIcon className="h-4 w-4" />}
      </button>
      {showNotesForProgram === program.id && (
        <EditableField
        initialValue={program.additionalNotes}
        onSave={(newValue) => handleEditField("additionalNotes", newValue)}
      />

      )}
    </tr>
  );
      }

export default ProgramTableRow;
