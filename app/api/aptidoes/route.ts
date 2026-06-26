import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const aptidoes = await prisma.professorDisciplina.findMany({
    include: {
      professor: true,
      disciplina: true,
    },
    orderBy: { id: 'desc' },
  });

  return NextResponse.json({ aptidoes });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.professorMatricula || !body.disciplinaCodigo) {
    return NextResponse.json({ message: 'Selecione professor e disciplina.' }, { status: 400 });
  }

  const existing = await prisma.professorDisciplina.findFirst({
    where: {
      professorMatricula: body.professorMatricula,
      disciplinaCodigo: body.disciplinaCodigo,
    },
  });

  if (existing) {
    return NextResponse.json({ message: 'Essa aptidão já existe.' }, { status: 409 });
  }

  const aptidao = await prisma.professorDisciplina.create({
    data: {
      professorMatricula: body.professorMatricula,
      disciplinaCodigo: body.disciplinaCodigo,
    },
  });

  return NextResponse.json({ aptidao }, { status: 201 });
}
