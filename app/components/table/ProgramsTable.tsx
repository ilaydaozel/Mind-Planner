import React, { useState } from 'react';
import { Th, Td, ProgramTableRow} from '@/app/components/table/TableElements';
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
             <ProgramTableRow 
             key={program.id} 
             program={program} 
             showNotesForProgram={showNotesForProgram} 
             toggleAdditionalNotes={toggleAdditionalNotes} 
         />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramsTable;
