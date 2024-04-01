import prisma from "@/app/lib/prismadb";

export default async function getAllPrograms(): Promise<IProgram[]> {
  try {
    const programsData = await prisma.program.findMany();
    return programsData;
  } catch (error: any) {
    console.error('Error fetching programs:', error);
    throw new Error(error);
  }
}