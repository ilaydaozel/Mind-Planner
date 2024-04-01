import React, { useState } from 'react';
import EditableField from './EditableField';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { handleApiResponse } from '@/app/utils/Helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';


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
      <table className="w-full border-collapse color-text1-700">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-1/12 border border-text1-300">Name</th>
            <th className="w-1/12 border border-text1-300">University</th>
            <th className="w-1/12 border border-text1-300">City</th>
            <th className="w-1/12 border border-text1-300">Program Link</th>
            <th className="w-2/12 border border-text1-300">Course Content</th>
            <th className="w-2/12 border border-text1-300">Requirements</th>
            <th className="w-1/12 border border-text1-300">Language</th>
            <th className="w-1/12 border border-text1-300">Deadline</th>
            <th className="border border-text1-300">Application Documents</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {programs.map(program => (
            <React.Fragment key={program.id}>
              <tr className="border border-text1-300">
                <EditableField initialValue={program.name} onSave={(newValue) => handleEditField(program.id || "", "name", newValue)} />
                <EditableField initialValue={program.universityName} onSave={(newValue) => handleEditField(program.id || "", "universityName", newValue)} />
                <EditableField initialValue={program.universityCity} onSave={(newValue) => handleEditField(program.id || "", "universityCity", newValue)} />
                <EditableField initialValue={program.programLink} onSave={(newValue) => handleEditField(program.id || "", "programLink", newValue)} />
                <EditableField initialValue={program.courseContent} onSave={(newValue) => handleEditField(program.id || "", "courseContent", newValue)} />
                <EditableField initialValue={program.requirements} onSave={(newValue) => handleEditField(program.id || "", "requirements", newValue)} />
                <EditableField initialValue={program.language} onSave={(newValue) => handleEditField(program.id || "", "language", newValue)} />
                <EditableField initialValue={program.applicationDeadline} onSave={(newValue) => handleEditField(program.id || "", "applicationDeadline", newValue)} />
                <EditableField initialValue={program.applicationDocuments} onSave={(newValue) => handleEditField(program.id || "", "applicationDocuments", newValue)} />
                <td className="border border-text1-300 bg-primary-400 cursor-pointer" onClick={() => toggleAdditionalNotes(program.id || "")}>
                  {showNotesForProgram === program.id ? <ChevronUpIcon className="h-4 w-4 text-white"/> : <ChevronDownIcon className="h-4 w-4 text-white" />}
                </td>
              </tr>

              {showNotesForProgram === program.id && program.additionalNotes!=="" &&(
                  <td colSpan={9} className="border border-text1-300">
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
