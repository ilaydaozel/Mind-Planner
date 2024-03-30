import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function PUT(request: Request) {
    const { id, fieldName, fieldValue } = await request.json();
    try {
        // Find the program by ID
        const existingProgram = await prisma.program.findUnique({
            where: { id: id }
        });
        if (!existingProgram) {
            return NextResponse.error();
        }

        // Update the specified field
        const updatedProgram = await prisma.program.update({
            where: { id: id },
            data: {
                [fieldName]: fieldValue
            }
        });
        return NextResponse.json(updatedProgram);
    } catch (error) {
        console.error("Error updating the program:", error);
        return NextResponse.error();
    }
}
