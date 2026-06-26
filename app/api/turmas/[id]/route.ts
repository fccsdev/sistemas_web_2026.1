import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();

  if (!body.professorMatricula || !body.disciplinaCodigo || !body.codigoTurma || !body.semestre || !body.horario) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  if (!['Manha', 'Tarde', 'Noite'].includes(body.horario)) {
    return NextResponse.json({ message: 'Horário inválido.' }, { status: 400 });
  }

  const turma = await prisma.turma.update({
    where: { id: Number(params.id) },
    data: {
      professorMatricula: body.professorMatricula,
      disciplinaCodigo: body.disciplinaCodigo,
      codigoTurma: body.codigoTurma,
      semestre: body.semestre,
      numeroAlunos: Number(body.numeroAlunos),
      horario: body.horario,
    },
  });

  return NextResponse.json({ turma });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  await prisma.turma.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: 'Turma removida com sucesso.' });
}
