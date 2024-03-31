import React, { useState } from 'react';
import { Th, ProgramTableRow} from '@/app/components/table/TableElements';

const ProgramsTable = ({ programs }: {programs: IProgram[]}) => {
    const [showNotesForProgram, setShowNotesForProgram] = useState<string | null>(null);

    const toggleAdditionalNotes = (programId: string) => {
      setShowNotesForProgram(showNotesForProgram === programId ? null : programId);
    };

  return (
      <table className="w-full divide-y divide-gray-200">
        <thead className="flex bg-gray-50 ">
        <Th className="w-1/18">Name</Th>
        <Th className="w-1/18">University</Th>
        <Th className="w-1/18">City</Th>
        <Th className="w-2/18">Program Link</Th>
        <Th className="w-2/18">Course Content</Th>
        <Th className="w-3/18">Requirements</Th>
        <Th className="w-1/18">Language</Th>
        <Th className="w-2/18">Application Deadline</Th>
        <Th className="w-4/18">Application Documents</Th>
        </thead>
        <tbody className="bg-white">
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
  );
};

export default ProgramsTable;
