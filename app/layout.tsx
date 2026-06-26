import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Sistema de Departamento Universitário',
  description: 'Sistema web para gerenciar professores, disciplinas, aptidões e turmas em um departamento universitário.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold">Sistema de Departamento Universitário</h1>
            <p className="mt-2 text-sm text-slate-600">Gerencie professores, disciplinas, aptidões, turmas e consultas operacionais do departamento.</p>
          </header>
          <Navigation />
          <main className="mt-6 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
