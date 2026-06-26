'use client';

import { useState } from 'react';
import type { Disciplina, Professor, ProfessorDisciplina } from '@prisma/client';

type AptidaoManagerProps = {
  professores: Professor[];
  disciplinas: Disciplina[];
  aptidoes: (ProfessorDisciplina & { professor: Professor; disciplina: Disciplina })[];
};

export function AptidaoManager({ professores, disciplinas, aptidoes }: AptidaoManagerProps) {
  const [items, setItems] = useState(aptidoes);
  const [form, setForm] = useState({ professorMatricula: '', disciplinaCodigo: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('');

    if (!form.professorMatricula || !form.disciplinaCodigo) {
      setStatus('Selecione um professor e uma disciplina.');
      return;
    }

    const response = await fetch('/api/aptidoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || 'Não foi possível registrar a aptidão.');
      return;
    }

    const professor = professores.find((item) => item.matricula === form.professorMatricula);
    const disciplina = disciplinas.find((item) => item.codigo === form.disciplinaCodigo);

    if (professor && disciplina) {
      setItems((current) => [{ ...data.aptidao, professor, disciplina }, ...current]);
    }
    setForm({ professorMatricula: '', disciplinaCodigo: '' });
    setStatus('Aptidão registrada com sucesso.');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Nova aptidão</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <select value={form.professorMatricula} onChange={(event) => setForm({ ...form, professorMatricula: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="">Selecione um professor</option>
            {professores.map((professor) => (
              <option key={professor.matricula} value={professor.matricula}>
                {professor.nome} ({professor.matricula})
              </option>
            ))}
          </select>
          <select value={form.disciplinaCodigo} onChange={(event) => setForm({ ...form, disciplinaCodigo: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina.codigo} value={disciplina.codigo}>
                {disciplina.nome} ({disciplina.codigo})
              </option>
            ))}
          </select>
          <button type="submit" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">Registrar aptidão</button>
        </form>
        {status ? <p className="mt-4 text-sm text-slate-600">{status}</p> : null}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Aptidões registradas</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-3 py-2">Professor</th>
                <th className="px-3 py-2">Disciplina</th>
              </tr>
            </thead>
            <tbody>
              {items.map((aptidao) => (
                <tr key={aptidao.id} className="border-t border-slate-200">
                  <td className="px-3 py-3">{aptidao.professor.nome}</td>
                  <td className="px-3 py-3">{aptidao.disciplina.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
