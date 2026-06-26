import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const disciplinas = await prisma.disciplina.findMany({
    orderBy: { nome: 'asc' },
  });

  return NextResponse.json({ disciplinas });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.codigo || !body.nome || !body.cargaHoraria) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
  }

  const disciplina = await prisma.disciplina.create({
    data: {
      codigo: body.codigo,
      nome: body.nome,
      cargaHoraria: Number(body.cargaHoraria),
    },
  });

  return NextResponse.json({ disciplina }, { status: 201 });
}
