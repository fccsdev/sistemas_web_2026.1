import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_request: Request, { params }: { params: { matricula: string } }) {
  try {
    const grouped = await prisma.turma.groupBy({
      by: ['disciplinaCodigo'],
      where: { professorMatricula: params.matricula },
      _count: { id: true },
      _sum: { numeroAlunos: true },
    });

    const disciplinaCodes = grouped.map((item) => item.disciplinaCodigo);
    const disciplinasData = await prisma.disciplina.findMany({
      where: { codigo: { in: disciplinaCodes } },
    });

    const disciplinasMap = new Map(disciplinasData.map((disciplina) => [disciplina.codigo, disciplina]));

    const disciplinas = grouped.map((item) => {
      const disciplina = disciplinasMap.get(item.disciplinaCodigo);
      const cargaHoraria = disciplina?.cargaHoraria ?? 0;

      return {
        nomeDisciplina: disciplina?.nome ?? item.disciplinaCodigo,
        quantidadeTurmas: item._count.id,
        cargaHoraria,
        cargaHorariaTotal: cargaHoraria * item._count.id,
        totalAlunos: item._sum.numeroAlunos ?? 0,
      };
    });

    return NextResponse.json({ disciplinas });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar disciplinas do professor.' }, { status: 500 });
  }
}
