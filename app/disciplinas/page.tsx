import { DisciplinaManager } from '@/components/DisciplinaManager';
import { prisma } from '@/lib/prisma';

export default async function DisciplinasPage() {
  const disciplinas = await prisma.disciplina.findMany({
    orderBy: { nome: 'asc' },
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Disciplinas</h2>
        <p className="mt-2 text-sm text-slate-600">Gerencie as disciplinas e suas cargas horárias.</p>
      </div>
      <DisciplinaManager disciplinas={disciplinas} />
    </section>
  );
}
