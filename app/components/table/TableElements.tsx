import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, CheckIcon } from "@heroicons/react/16/solid";
import { handleApiResponse } from '@/app/utils/Helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EditableField from './EditableField';


export const Th = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <th className={`${className} line-clamp-1`}>
      {children}
    </th>
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
      <EditableField className="w-1/12" initialValue={program.name} onSave={(newValue) => handleEditField("name", newValue)} />
      <EditableField className="w-1/12" initialValue={program.universityName} onSave={(newValue) => handleEditField("universityName", newValue)} />
      <EditableField className="w-1/12" initialValue={program.universityCity} onSave={(newValue) => handleEditField("universityCity", newValue)} />
      <EditableField className="w-2/12" initialValue={program.programLink} onSave={(newValue) => handleEditField("programLink", newValue)} />
      <EditableField className="w-3/12" initialValue={program.courseContent} onSave={(newValue) => handleEditField("courseContent", newValue)} />
      <EditableField className="w-3/12" initialValue={program.requirements} onSave={(newValue) => handleEditField("requirements", newValue)} />
      <EditableField className="w-1/12" initialValue={program.language} onSave={(newValue) => handleEditField("language", newValue)} />
      <EditableField className="w-1/12" initialValue={program.applicationDeadline} onSave={(newValue) => handleEditField("applicationDeadline", newValue)} />
      <EditableField className="w-4/12" initialValue={program.applicationDocuments} onSave={(newValue) => handleEditField("applicationDocuments", newValue)} />
      <button onClick={() => toggleAdditionalNotes(program.id || "")} className="text-primary-500 cursor-pointer flex items-center space-x-1">
        {showNotesForProgram === program.id ? <ChevronUpIcon className="h-4 w-4"/> : <ChevronDownIcon className="h-4 w-4" />}
      </button>
      {showNotesForProgram === program.id && (
        <EditableField className="w-full" initialValue={program.additionalNotes} onSave={(newValue) => handleEditField("additionalNotes", newValue)} />
      )}
    </tr>
  );
};
