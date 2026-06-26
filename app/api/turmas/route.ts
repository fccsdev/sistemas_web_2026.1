import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const turmas = await prisma.turma.findMany({
    include: {
      professor: true,
      disciplina: true,
    },
    orderBy: { codigoTurma: 'asc' },
  });

  return NextResponse.json({ turmas });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.professorMatricula || !body.disciplinaCodigo || !body.codigoTurma || !body.semestre || !body.horario) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  if (!['Manha', 'Tarde', 'Noite'].includes(body.horario)) {
    return NextResponse.json({ message: 'Horário inválido.' }, { status: 400 });
  }

  const turma = await prisma.turma.create({
    data: {
      professorMatricula: body.professorMatricula,
      disciplinaCodigo: body.disciplinaCodigo,
      codigoTurma: body.codigoTurma,
      semestre: body.semestre,
      numeroAlunos: Number(body.numeroAlunos),
      horario: body.horario,
    },
  });

  return NextResponse.json({ turma }, { status: 201 });
}
