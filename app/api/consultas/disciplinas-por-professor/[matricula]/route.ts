import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_request: Request, { params }: { params: { matricula: string } }) {
  const disciplinas = await prisma.$queryRaw<Array<{ nomeDisciplina: string; quantidadeTurmas: number; cargaHoraria: number; cargaHorariaTotal: number; totalAlunos: number }>>`
    SELECT
      d.nome AS nomeDisciplina,
      COUNT(t.id) AS quantidadeTurmas,
      d.cargaHoraria,
      d.cargaHoraria * COUNT(t.id) AS cargaHorariaTotal,
      COALESCE(SUM(t.numeroAlunos), 0) AS totalAlunos
    FROM "Turma" t
    JOIN "Disciplina" d ON d.codigo = t.disciplinaCodigo
    WHERE t.professorMatricula = ${params.matricula}
    GROUP BY d.codigo, d.nome, d.cargaHoraria
  `;

  return NextResponse.json({ disciplinas });
}
