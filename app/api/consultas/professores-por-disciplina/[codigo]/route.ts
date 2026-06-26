import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_request: Request, { params }: { params: { codigo: string } }) {
  const professores = await prisma.$queryRaw<Array<{ matricula: string; nome: string; email: string; telefone: string }>>`
    SELECT p.matricula, p.nome, p.email, p.telefone
    FROM "ProfessorDisciplina" pd
    JOIN "Professor" p ON p.matricula = pd.professorMatricula
    WHERE pd.disciplinaCodigo = ${params.codigo}
  `;

  return NextResponse.json({ professores });
}
