import { ConsultasPanel } from '@/components/ConsultasPanel';
import { prisma } from '@/lib/prisma';

export default async function ConsultasPage() {
  const disciplinas = await prisma.disciplina.findMany({ orderBy: { nome: 'asc' } });
  const professores = await prisma.professor.findMany({ orderBy: { nome: 'asc' } });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Consultas</h2>
        <p className="mt-2 text-sm text-slate-600">Consulte professores habilitados por disciplina e disciplinas por professor.</p>
      </div>
      <ConsultasPanel disciplinas={disciplinas} professores={professores} />
    </section>
  );
}
