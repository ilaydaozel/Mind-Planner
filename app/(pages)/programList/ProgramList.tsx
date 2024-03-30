import { IProgram } from '@/types';
import React from 'react';

const ProgramList = ({ programs }: {programs: IProgram[]}) => {
  return (
    <div>
      <h2>Program List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>University</th>
            <th>City</th>
            <th>Program Link</th>
            <th>Course Content</th>
            <th>Requirements</th>
            <th>Language</th>
            <th>Application Deadline</th>
            <th>Application Documents</th>
            <th>Additional Notes</th>
          </tr>
        </thead>
        <tbody>
          {programs.map(program => (
            <tr key={program.id}>
              <td>{program.name}</td>
              <td>{program.universityName}</td>
              <td>{program.universityCity}</td>
              <td>{program.programLink}</td>
              <td>{program.courseContent}</td>
              <td>{program.requirements}</td>
              <td>{program.language}</td>
              <td>{program.applicationDeadline}</td>
              <td>{program.applicationDocuments}</td>
              <td>{program.additionalNotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramList;
