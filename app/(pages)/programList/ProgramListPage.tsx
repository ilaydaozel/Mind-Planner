'use client'

import React, { useEffect, useState } from 'react';
import ProgramList from './ProgramList';
import { fetchPrograms } from '@/app/api/program/fetchProgram/fetchProgram';

const ProgramListPage = () => {
  const [programs, setPrograms] = useState<IProgram[]>([]);

  useEffect(() => {
    // Fetch programs from the database
    const fetchData = async () => {
      try {
        const programsData = await fetchPrograms(); // Call fetchPrograms function
        setPrograms(programsData);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      <ProgramList programs={programs} />
    </div>
  );
};

export default ProgramListPage;
