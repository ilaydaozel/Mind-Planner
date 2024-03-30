// utils/programService.ts

import prisma from "@/app/lib/prismadb";
import { IProgram } from '@/types'; // Assuming you've defined the Program interface in a types file

export async function fetchPrograms(): Promise<IProgram[]> {
  try {
    const programsData = await prisma.program.findMany();
    return programsData;
  } catch (error) {
    console.error('Error fetching programs:', error);
    return [];
  }
}
