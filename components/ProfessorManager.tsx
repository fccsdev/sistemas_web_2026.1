'use client';

import { useState } from 'react';
import type { Professor } from '@prisma/client';

type ProfessorManagerProps = {
  professors: Professor[];
};

const emptyForm = {
  matricula: '',
  nome: '',
  email: '',
  telefone: '',
};

export function ProfessorManager({ professors }: ProfessorManagerProps) {
  const [items, setItems] = useState(professors);
  const [form, setForm] = useState(emptyForm);
  const [editingMatricula, setEditingMatricula] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('');

    const payload = {
      matricula: form.matricula.trim(),
      nome: form.nome.trim(),
      email: form.email.trim(),
      telefone: form.telefone.trim(),
    };

    if (!payload.matricula || !payload.nome || !payload.email || !payload.telefone) {
      setStatus('Preencha todos os campos para continuar.');
      return;
    }

    const method = editingMatricula ? 'PUT' : 'POST';
    const url = editingMatricula ? `/api/professores/${encodeURIComponent(editingMatricula)}` : '/api/professores';
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || 'Não foi possível salvar o professor.');
      return;
    }

    if (editingMatricula) {
      setItems((current) => current.map((item) => (item.matricula === editingMatricula ? data.professor : item)));
      setStatus('Professor atualizado com sucesso.');
    } else {
      setItems((current) => [data.professor, ...current]);
      setStatus('Professor cadastrado com sucesso.');
    }

    setForm(emptyForm);
    setEditingMatricula(null);
  };

  const handleEdit = (professor: Professor) => {
    setForm({
      matricula: professor.matricula,
      nome: professor.nome,
      email: professor.email,
      telefone: professor.telefone,
    });
    setEditingMatricula(professor.matricula);
    setStatus('');
  };

  const handleDelete = async (matricula: string) => {
    if (!window.confirm('Deseja remover este professor?')) {
      return;
    }

    const response = await fetch(`/api/professores/${encodeURIComponent(matricula)}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || 'Não foi possível remover o professor.');
      return;
    }

    setItems((current) => current.filter((item) => item.matricula !== matricula));
    setStatus('Professor removido com sucesso.');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">{editingMatricula ? 'Editar professor' : 'Novo professor'}</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input value={form.matricula} onChange={(event) => setForm({ ...form, matricula: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Matrícula" disabled={Boolean(editingMatricula)} />
          <input value={form.nome} onChange={(event) => setForm({ ...form, nome: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Nome" />
          <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Email" type="email" />
          <input value={form.telefone} onChange={(event) => setForm({ ...form, telefone: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Telefone" />
          <div className="flex gap-3">
            <button type="submit" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">{editingMatricula ? 'Salvar alterações' : 'Cadastrar'}</button>
            {editingMatricula ? (
              <button type="button" onClick={() => { setForm(emptyForm); setEditingMatricula(null); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                Cancelar
              </button>
            ) : null}
          </div>
        </form>
        {status ? <p className="mt-4 text-sm text-slate-600">{status}</p> : null}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Professores cadastrados</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-3 py-2">Matrícula</th>
                <th className="px-3 py-2">Nome</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Telefone</th>
                <th className="px-3 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((professor) => (
                <tr key={professor.matricula} className="border-t border-slate-200">
                  <td className="px-3 py-3">{professor.matricula}</td>
                  <td className="px-3 py-3">{professor.nome}</td>
                  <td className="px-3 py-3">{professor.email}</td>
                  <td className="px-3 py-3">{professor.telefone}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(professor)} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">Editar</button>
                      <button onClick={() => handleDelete(professor.matricula)} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Excluir</button>
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
