import React, { useState } from 'react';
import { Th, Td} from '@/app/components/table/TableElements';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

const ProgramsTable = ({ programs }: {programs: IProgram[]}) => {
    const [showNotesForProgram, setShowNotesForProgram] = useState<string | null>(null);

    const toggleAdditionalNotes = (programId: string) => {
      setShowNotesForProgram(showNotesForProgram === programId ? null : programId);
    };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <div className='flex'>
            <Th>Name</Th>
            <Th>University</Th>
            <Th>City</Th>
            <Th>Program Link</Th>
            <Th>Course Content</Th>
            <Th>Requirements</Th>
            <Th>Language</Th>
            <Th>Application Deadline</Th>
            <Th>Application Documents</Th>
          </div>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {programs.map(program => (
            <tr key={program.id}>
                <div className='w-full flex'>
                <Td>{program.name}</Td>
                <Td>{program.universityName}</Td>
                <Td>{program.universityCity}</Td>
                <Td>{program.programLink}</Td>
                <Td>{program.courseContent}</Td>
                <Td>{program.requirements}</Td>
                <Td>{program.language}</Td>
                <Td>{program.applicationDeadline}</Td>
                <Td>{program.applicationDocuments}</Td>
                </div>
                <button onClick={() => toggleAdditionalNotes(program.id || "")} className="text-primary-500 cursor-pointer flex items-center space-x-1">
                  {showNotesForProgram === program.id ? <ChevronUpIcon className="h-4 w-4"/> : <ChevronDownIcon className="h-4 w-4" />}
                </button>
                {showNotesForProgram === program.id && (
                <Td>{program.additionalNotes}</Td>
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramsTable;
