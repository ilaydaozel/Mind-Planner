'use client'

import React, { useEffect, useState } from 'react';
import ProgramList from './ProgramList';
import { fetchPrograms } from '@/app/api/program/fetchProgram/route';
import AddProgramForm from '@/app/components/forms/AddProgramForm';
import Button from '@/app/components/buttons/Button';

const ProgramListPage = ({programs}:{programs: IProgram[]}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div>
      <Button onClick={openModal} label='Add Program'></Button>
      <AddProgramForm isOpen={isModalOpen} onClose={closeModal} />
      <ProgramList programs={programs} />
    </div>
  );
};

export default ProgramListPage;
