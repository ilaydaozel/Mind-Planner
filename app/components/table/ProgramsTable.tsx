import React, { useState } from 'react';
import EditableField from './EditableField';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { handleApiResponse } from '@/app/utils/Helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Th = ({ text, width }: { text: string, width?: string }) => {
  const classes = width ? `border border-text1-300 py-2 px-2 text-sm ${width}` : 'border border-text1-300 text-sm px-2 py-2'; // Use provided width or default width
  return (
    <th className={classes}>{text}</th>
  );
};

const ProgramsTable = ({ programs }: {programs: IProgram[]}) => {
    const [showNotesForProgram, setShowNotesForProgram] = useState<string | null>(null);
    const router = useRouter();

    const toggleAdditionalNotes = (programId: string) => {
      setShowNotesForProgram(showNotesForProgram === programId ? null : programId);
    };

    const handleEditField = async (id:string, fieldName: string, fieldValue: any) => {
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
      } catch (error) {
        console.error('Error updating field:', error);
      }
    };
  
  return (
      <table className="w-full border-collapse shadow-lg">
        <thead className="bg-white text-text1-900">
          <tr>
          <Th text='Name' width="w-1/12" />
          <Th text='University' width="w-1/12" />
          <Th text='City' width="w-1/12" />
          <Th text='Program Link' width="w-1/12" />
          <Th text='Course Content' width="w-2/12" />
          <Th text='Requirements' width="w-2/12" />
          <Th text='Language' width="w-1/12" />
          <Th text='Deadline' width="w-1/12" />
          <Th text='Application Documents' />
          </tr>
        </thead>
        <tbody className="bg-white text-text1-600">
          {programs.map(program => (
            <React.Fragment key={program.id}>
              <tr>
                <EditableField initialValue={program.name} onSave={(newValue) => handleEditField(program.id || "", "name", newValue)} />
                <EditableField initialValue={program.universityName} onSave={(newValue) => handleEditField(program.id || "", "universityName", newValue)} />
                <EditableField initialValue={program.universityCity} onSave={(newValue) => handleEditField(program.id || "", "universityCity", newValue)} />
                <EditableField initialValue={program.programLink} onSave={(newValue) => handleEditField(program.id || "", "programLink", newValue)} />
                <EditableField initialValue={program.courseContent} onSave={(newValue) => handleEditField(program.id || "", "courseContent", newValue)} />
                <EditableField initialValue={program.requirements} onSave={(newValue) => handleEditField(program.id || "", "requirements", newValue)} />
                <EditableField initialValue={program.language} onSave={(newValue) => handleEditField(program.id || "", "language", newValue)} />
                <EditableField initialValue={program.applicationDeadline} onSave={(newValue) => handleEditField(program.id || "", "applicationDeadline", newValue)} />
                <EditableField initialValue={program.applicationDocuments} onSave={(newValue) => handleEditField(program.id || "", "applicationDocuments", newValue)} />
                <div className="bg-bg-700 cursor-pointer h-6 w-8 rounded-sm" onClick={() => toggleAdditionalNotes(program.id || "")}>
                  {showNotesForProgram === program.id ? <ChevronUpIcon className="h-5 w-5 font-xl text-white m-auto"/> : <ChevronDownIcon className="h-5 w-5 font-xl text-white m-auto" />}
                </div>
              </tr>
              {showNotesForProgram === program.id && program.additionalNotes!=="" &&(
                  <td colSpan={9} className="border border-text1-300 p-4">
                    <EditableField initialValue={program.additionalNotes} onSave={(newValue) => handleEditField(program.id || "", "additionalNotes", newValue)} />
                  </td>

              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
  );
};

export default ProgramsTable;
