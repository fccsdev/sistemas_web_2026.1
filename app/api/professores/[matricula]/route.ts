import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { matricula: string } }) {
  const body = await request.json();

  if (!body.nome || !body.email || !body.telefone) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  const professor = await prisma.professor.update({
    where: { matricula: params.matricula },
    data: {
      nome: body.nome,
      email: body.email,
      telefone: body.telefone,
    },
  });

  return NextResponse.json({ professor });
}

export async function DELETE(_request: Request, { params }: { params: { matricula: string } }) {
  await prisma.professor.delete({
    where: { matricula: params.matricula },
  });

  return NextResponse.json({ message: 'Professor removido com sucesso.' });
}
