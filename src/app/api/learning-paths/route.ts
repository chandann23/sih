import { NextResponse } from 'next/server';
import { db } from '~/server/db';

export async function POST(request: Request) {
  try {
    const learningPaths = await request.json();

    const createdLearningPaths = await Promise.all(
      learningPaths.map(async (path: any) => {
const createdPath = await db.learningPath.create({
          data: {
            title: path.title,
            chapters: {
              create: path.chapters.map((chapter: any) => ({
                title: chapter.title,
                subChapters: {
                  create: chapter.subChapters.map((subChapter: any) => ({
                    title: subChapter.title,
                  })),
                },
              })),
            },
          },
          include: {
            chapters: {
              include: {
                subChapters: true,
              },
            },
          },
        });
        return createdPath;
      })
    );

    return NextResponse.json(createdLearningPaths, { status: 201 });
  } catch (error) {
    console.error('Error saving learning paths:', error);
    return NextResponse.json({ error: 'Error saving learning paths' }, { status: 500 });
  }
}




export async function GET() {
  try {
    const learningPaths = await db.learningPath.findMany({
      include: {
        chapters: {
          include: {
            subChapters: true,
          },
        },
      },
    });

    return NextResponse.json(learningPaths);
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    return NextResponse.json({ error: 'Error fetching learning paths' }, { status: 500 });
  }
}






export async function PUT(request: Request) {
  try {
    const learningPaths = await request.json();

    const updatedLearningPaths = await Promise.all(
      learningPaths.map(async (path: any) => {
        const updatedPath = await db.learningPath.update({
          where: { id: path.id },
          data: {
            title: path.title,
            chapters: {
              upsert: path.chapters.map((chapter: any) => ({
                where: { id: chapter.id },
                update: {
                  title: chapter.title,
                  subChapters: {
                    upsert: chapter.subChapters.map((subChapter: any) => ({
                      where: { id: subChapter.id },
                      update: { title: subChapter.title },
                      create: { title: subChapter.title },
                    })),
                  },
                },
                create: {
                  title: chapter.title,
                  subChapters: {
                    create: chapter.subChapters.map((subChapter: any) => ({
                      title: subChapter.title,
                    })),
                  },
                },
              })),
            },
          },
          include: {
            chapters: {
              include: {
                subChapters: true,
              },
            },
          },
        });
        return updatedPath;
      })
    );

    return NextResponse.json(updatedLearningPaths);
  } catch (error) {
    console.error('Error updating learning paths:', error);
    return NextResponse.json({ error: 'Error updating learning paths' }, { status: 500 });
  }
}
