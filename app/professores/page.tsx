import { ProfessorManager } from '@/components/ProfessorManager';
import { prisma } from '@/lib/prisma';

export default async function ProfessoresPage() {
  const professores = await prisma.professor.findMany({
    orderBy: { nome: 'asc' },
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Professores</h2>
        <p className="mt-2 text-sm text-slate-600">Cadastre, edite e remova professores do sistema.</p>
      </div>
      <ProfessorManager professors={professores} />
    </section>
  );
}
