import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        name,
        universityName,
        universityCity,
        programLink,
        courseContent,
        requirements,
        language,
        applicationDeadline,
        applicationDocuments,
        additionalNotes,
    } = body;
    try{
        const program = await prisma.program.create({
            data: {
                name: name,
                universityName: universityName,
                universityCity: universityCity,
                programLink : programLink,
                courseContent,
                requirements,
                language,
                applicationDeadline,
                applicationDocuments,
                additionalNotes,
            }
        });
        return NextResponse.json(program);


    }catch (error) {
        console.error("Error adding the program:", error);
        return NextResponse.json({ error: "An error occurred while adding the program: " + error });
    }


    
}
