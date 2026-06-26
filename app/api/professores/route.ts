import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const professores = await prisma.professor.findMany({
    orderBy: { nome: 'asc' },
  });

  return NextResponse.json({ professores });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.matricula || !body.nome || !body.email || !body.telefone) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  const professor = await prisma.professor.create({
    data: {
      matricula: body.matricula,
      nome: body.nome,
      email: body.email,
      telefone: body.telefone,
    },
  });

  return NextResponse.json({ professor }, { status: 201 });
}
