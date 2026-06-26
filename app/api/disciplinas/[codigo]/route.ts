import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { codigo: string } }) {
  const body = await request.json();

  if (!body.nome || !body.cargaHoraria) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  const disciplina = await prisma.disciplina.update({
    where: { codigo: params.codigo },
    data: {
      nome: body.nome,
      cargaHoraria: Number(body.cargaHoraria),
    },
  });

  return NextResponse.json({ disciplina });
}

export async function DELETE(_request: Request, { params }: { params: { codigo: string } }) {
  await prisma.disciplina.delete({
    where: { codigo: params.codigo },
  });

  return NextResponse.json({ message: 'Disciplina removida com sucesso.' });
}
