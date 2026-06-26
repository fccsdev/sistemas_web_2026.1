import { AptidaoManager } from '@/components/AptidaoManager';
import { prisma } from '@/lib/prisma';

export default async function AptidoesPage() {
  const professores = await prisma.professor.findMany({ orderBy: { nome: 'asc' } });
  const disciplinas = await prisma.disciplina.findMany({ orderBy: { nome: 'asc' } });
  const aptidoes = await prisma.professorDisciplina.findMany({
    include: {
      professor: true,
      disciplina: true,
    },
    orderBy: { id: 'desc' },
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Aptidões</h2>
        <p className="mt-2 text-sm text-slate-600">Associe professores às disciplinas que eles estão qualificados a ministrar.</p>
      </div>
      <AptidaoManager professores={professores} disciplinas={disciplinas} aptidoes={aptidoes} />
    </section>
  );
}
