'use client'

import React, { useState } from 'react';
import ProgramsTable from '../../components/table/ProgramsTable';
import AddProgramForm from '@/app/components/forms/AddProgramForm';
import Button from '@/app/components/formComponents/Button';

const ProgramListPage = ({programs}:{programs: IProgram[]}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='flex flex-col items-end gap-2 w-[95vw]'>
      <Button onClick={openModal} label='Add Program'></Button>
      <AddProgramForm isOpen={isModalOpen} onClose={closeModal} />
      <ProgramsTable programs={programs} />
    </div>
  );
};

export default ProgramListPage;
