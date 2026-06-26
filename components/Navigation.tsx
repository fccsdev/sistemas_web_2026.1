import Link from 'next/link';

const links = [
  { href: '/professores', label: 'Professores' },
  { href: '/disciplinas', label: 'Disciplinas' },
  { href: '/aptidoes', label: 'Aptidões' },
  { href: '/turmas', label: 'Turmas' },
  { href: '/consultas', label: 'Consultas' },
];

export function Navigation() {
  return (
    <nav className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <ul className="flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-sky-100 hover:text-sky-700">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
