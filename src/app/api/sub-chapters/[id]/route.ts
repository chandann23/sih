import { NextResponse } from 'next/server';
import {db} from '~/server/db';
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const subChapterId = params.id;
    const { completed } = await request.json();

    try {
        const updatedSubChapter = await db.subChapter.update({
            where: { id: subChapterId },
            data: { completed },
        });
        return NextResponse.json(updatedSubChapter);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update subchapter' }, { status: 500 });
    }
}

