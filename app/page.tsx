import Link from 'next/link';

const cards = [
  { href: '/professores', title: 'Professores', description: 'Cadastre, atualize e consulte os docentes do departamento.' },
  { href: '/disciplinas', title: 'Disciplinas', description: 'Mantenha o catálogo de disciplinas e suas cargas horárias.' },
  { href: '/aptidoes', title: 'Aptidões', description: 'Associe professores às disciplinas que podem ministrar.' },
  { href: '/turmas', title: 'Turmas', description: 'Registre turmas, horários e lotação de alunos.' },
  { href: '/consultas', title: 'Consultas', description: 'Acesse consultas consolidadas para análise operacional.' },
];

export default function HomePage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">Sistema de gestão</p>
        <h2 className="mt-3 text-3xl font-semibold">Gerenciamento completo do departamento universitário.</h2>
        <p className="mt-4 text-base text-slate-600">
          Acompanhe professores, disciplinas, aptidões, turmas e consultas operacionais em uma única interface de gestão.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-xl border border-slate-200 p-5 transition hover:border-sky-500 hover:shadow-sm">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
