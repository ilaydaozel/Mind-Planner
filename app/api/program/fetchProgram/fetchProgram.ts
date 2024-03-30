// utils/programService.ts

import prisma from "@/app/lib/prismadb";

export async function fetchPrograms(): Promise<IProgram[]> {
  try {
    const programsData = await prisma.program.findMany();
    return programsData;
  } catch (error) {
    console.error('Error fetching programs:', error);
    return [];
  }
}
