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

    const program = await prisma.program.create({
        data: {
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
        }
    });

    return NextResponse.json(program);
}
