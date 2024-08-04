import React, { useState } from 'react';
import EditableField from './EditableField';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { handleApiResponse } from '@/app/utils/Helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import IntegerEditableField from './IntegerEditableField';

const ProgramsTable = ({ programs }: { programs: IProgram[] }) => {
  const [showNotesForProgram, setShowNotesForProgram] = useState<string | null>(null);
  const router = useRouter();

  const toggleAdditionalNotes = (programId: string) => {
    setShowNotesForProgram(showNotesForProgram === programId ? null : programId);
  };

  const handleEditField = async (id: string, fieldName: string, fieldValue: any) => {
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

  const sortedPrograms = [...programs].sort((a, b) => {
    const rankA = a.ranking === null ? Infinity : a.ranking;
    const rankB = b.ranking === null ? Infinity : b.ranking;
    return rankA - rankB;
  });

  const getStatusClassName = (status: string | null) => {
    switch (status) {
      case 'ToBeApplied':
        return 'bg-yellow-50';
      case 'NotToBeApplied':
        return 'bg-gray-100';
      case 'Applied':
        return 'bg-blue-100';
      case 'Accepted':
        return 'bg-green-100';
      default:
        return 'bg-white';
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead className="bg-gray-50">
        <tr>
          <th className="w-1/12 border border-text1-300">Name</th>
          <th className="w-1/12 border border-text1-300">University</th>
          <th className="w-1/12 border border-text1-300">Program Link</th>
          <th className="w-2/12 border border-text1-300">Course Content</th>
          <th className="w-3/12 border border-text1-300">Requirements</th>
          <th className="w-1/12 border border-text1-300">Language</th>
          <th className="w-1/12 border border-text1-300">Deadline</th>
          <th className="w-1/12 border border-text1-300">Status</th>
          <th className="w-1/12 border border-text1-300">Rank</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {sortedPrograms.map((program) => (
          <React.Fragment key={program.id}>
            <tr className={`border border-text1-300 ${getStatusClassName(program.applicationStatus)}`}>
              <EditableField initialValue={program.name} onSave={(newValue) => handleEditField(program.id || "", "name", newValue)} />
              <EditableField initialValue={program.universityName} onSave={(newValue) => handleEditField(program.id || "", "universityName", newValue)} />
              <EditableField initialValue={program.programLink} onSave={(newValue) => handleEditField(program.id || "", "programLink", newValue)} />
              <EditableField initialValue={program.courseContent} onSave={(newValue) => handleEditField(program.id || "", "courseContent", newValue)} />
              <EditableField initialValue={program.requirements} onSave={(newValue) => handleEditField(program.id || "", "requirements", newValue)} />
              <EditableField initialValue={program.language} onSave={(newValue) => handleEditField(program.id || "", "language", newValue)} />
              <EditableField initialValue={program.applicationDeadline} onSave={(newValue) => handleEditField(program.id || "", "applicationDeadline", newValue)} />
              <EditableField initialValue={program.applicationStatus} onSave={(newValue) => handleEditField(program.id || "", "applicationStatus", newValue)} />
              <IntegerEditableField initialValue={program.ranking} onSave={(newValue) => handleEditField(program.id || "", "ranking", newValue)} />
              <td className="bg-primary-300 cursor-pointer rounded-sm" onClick={() => toggleAdditionalNotes(program.id || "")}>
                {showNotesForProgram === program.id ? <ChevronUpIcon className="h-5 w-5 font-xl text-white m-auto" /> : <ChevronDownIcon className="h-5 w-5 font-xl text-white m-auto" />}
              </td>
            </tr>
            {showNotesForProgram === program.id && (
              <tr>
                <td colSpan={9}>
                  <EditableField colSpan={9} initialValue={program.additionalNotes} onSave={(newValue) => handleEditField(program.id || "", "additionalNotes", newValue)} />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ProgramsTable;
