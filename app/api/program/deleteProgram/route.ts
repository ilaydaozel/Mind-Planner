import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function DELETE(request: Request) {
    const { id } = await request.json();
    try {
        // Find the program by ID and delete it
        const deletedProgram = await prisma.program.delete({
            where: { id: id }
        });
        return NextResponse.json(deletedProgram);
    } catch (error) {
        console.error("Error deleting the program:", error);
        return NextResponse.json({ error: "An error occurred while deleting the program: " + error });
    }
}
