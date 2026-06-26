import { TurmaManager } from '@/components/TurmaManager';
import { prisma } from '@/lib/prisma';

export default async function TurmasPage() {
  const professores = await prisma.professor.findMany({ orderBy: { nome: 'asc' } });
  const disciplinas = await prisma.disciplina.findMany({ orderBy: { nome: 'asc' } });
  const turmas = await prisma.turma.findMany({
    include: {
      professor: true,
      disciplina: true,
    },
    orderBy: { codigoTurma: 'asc' },
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Turmas</h2>
        <p className="mt-2 text-sm text-slate-600">Registre turmas, horários e quantidade de alunos.</p>
      </div>
      <TurmaManager professores={professores} disciplinas={disciplinas} turmas={turmas} />
    </section>
  );
}
