'use client';

import { useState } from 'react';
import type { Disciplina, Professor, Turma } from '@prisma/client';

type TurmaManagerProps = {
  professores: Professor[];
  disciplinas: Disciplina[];
  turmas: (Turma & { professor: Professor; disciplina: Disciplina })[];
};

type HorarioValue = 'Manha' | 'Tarde' | 'Noite';

const emptyForm = {
  professorMatricula: '',
  disciplinaCodigo: '',
  codigoTurma: '',
  semestre: '',
  numeroAlunos: '',
  horario: 'Manha' as HorarioValue,
};

export function TurmaManager({ professores, disciplinas, turmas }: TurmaManagerProps) {
  const [items, setItems] = useState(turmas);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('');

    const payload = {
      professorMatricula: form.professorMatricula,
      disciplinaCodigo: form.disciplinaCodigo,
      codigoTurma: form.codigoTurma.trim(),
      semestre: form.semestre.trim(),
      numeroAlunos: Number(form.numeroAlunos),
      horario: form.horario,
    };

    if (!payload.professorMatricula || !payload.disciplinaCodigo || !payload.codigoTurma || !payload.semestre || Number.isNaN(payload.numeroAlunos) || payload.numeroAlunos <= 0) {
      setStatus('Preencha todos os campos corretamente.');
      return;
    }

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/turmas/${editingId}` : '/api/turmas';
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || 'Não foi possível salvar a turma.');
      return;
    }

    const professor = professores.find((item) => item.matricula === payload.professorMatricula);
    const disciplina = disciplinas.find((item) => item.codigo === payload.disciplinaCodigo);

    if (editingId) {
      setItems((current) => current.map((item) => (item.id === editingId ? { ...item, ...data.turma, professor, disciplina } : item)));
      setStatus('Turma atualizada com sucesso.');
    } else {
      setItems((current) => [{ ...data.turma, professor, disciplina }, ...current]);
      setStatus('Turma cadastrada com sucesso.');
    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (turma: (Turma & { professor: Professor; disciplina: Disciplina })) => {
    setForm({
      professorMatricula: turma.professorMatricula,
      disciplinaCodigo: turma.disciplinaCodigo,
      codigoTurma: turma.codigoTurma,
      semestre: turma.semestre,
      numeroAlunos: String(turma.numeroAlunos),
      horario: turma.horario as HorarioValue,
    });
    setEditingId(turma.id);
    setStatus('');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja remover esta turma?')) {
      return;
    }

    const response = await fetch(`/api/turmas/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || 'Não foi possível remover a turma.');
      return;
    }

    setItems((current) => current.filter((item) => item.id !== id));
    setStatus('Turma removida com sucesso.');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(320px,420px)_1fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">{editingId ? 'Editar turma' : 'Nova turma'}</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <select value={form.professorMatricula} onChange={(event) => setForm({ ...form, professorMatricula: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="">Selecione um professor</option>
            {professores.map((professor) => (
              <option key={professor.matricula} value={professor.matricula}>
                {professor.nome}
              </option>
            ))}
          </select>
          <select value={form.disciplinaCodigo} onChange={(event) => setForm({ ...form, disciplinaCodigo: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina.codigo} value={disciplina.codigo}>
                {disciplina.nome}
              </option>
            ))}
          </select>
          <input value={form.codigoTurma} onChange={(event) => setForm({ ...form, codigoTurma: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Código da turma" />
          <input value={form.semestre} onChange={(event) => setForm({ ...form, semestre: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Semestre" />
          <input value={form.numeroAlunos} onChange={(event) => setForm({ ...form, numeroAlunos: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Número de alunos" type="number" />
          <select value={form.horario} onChange={(event) => setForm({ ...form, horario: event.target.value as 'Manha' | 'Tarde' | 'Noite' })} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="Manha">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
          </select>
          <div className="flex gap-3">
            <button type="submit" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">{editingId ? 'Salvar alterações' : 'Cadastrar'}</button>
            {editingId ? (
              <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                Cancelar
              </button>
            ) : null}
          </div>
        </form>
        {status ? <p className="mt-4 text-sm text-slate-600">{status}</p> : null}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Turmas cadastradas</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-3 py-2">Turma</th>
                <th className="px-3 py-2">Professor</th>
                <th className="px-3 py-2">Disciplina</th>
                <th className="px-3 py-2">Semestre</th>
                <th className="px-3 py-2">Alunos</th>
                <th className="px-3 py-2">Horário</th>
                <th className="px-3 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((turma) => (
                <tr key={turma.id} className="border-t border-slate-200">
                  <td className="px-3 py-3">{turma.codigoTurma}</td>
                  <td className="px-3 py-3">{turma.professor.nome}</td>
                  <td className="px-3 py-3">{turma.disciplina.nome}</td>
                  <td className="px-3 py-3">{turma.semestre}</td>
                  <td className="px-3 py-3">{turma.numeroAlunos}</td>
                  <td className="px-3 py-3">{turma.horario}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(turma)} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">Editar</button>
                      <button onClick={() => handleDelete(turma.id)} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
