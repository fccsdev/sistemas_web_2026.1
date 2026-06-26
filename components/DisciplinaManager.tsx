'use client';

import { useState } from 'react';
import type { Disciplina } from '@prisma/client';

type DisciplinaManagerProps = {
  disciplinas: Disciplina[];
};

const emptyForm = {
  codigo: '',
  nome: '',
  cargaHoraria: '',
};

export function DisciplinaManager({ disciplinas }: DisciplinaManagerProps) {
  const [items, setItems] = useState(disciplinas);
  const [form, setForm] = useState(emptyForm);
  const [editingCodigo, setEditingCodigo] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('');

    const payload = {
      codigo: form.codigo.trim(),
      nome: form.nome.trim(),
      cargaHoraria: Number(form.cargaHoraria),
    };

    if (!payload.codigo || !payload.nome || Number.isNaN(payload.cargaHoraria) || payload.cargaHoraria <= 0) {
      setStatus('Informe código, nome e carga horária válida.');
      return;
    }

    const method = editingCodigo ? 'PUT' : 'POST';
    const url = editingCodigo ? `/api/disciplinas/${encodeURIComponent(editingCodigo)}` : '/api/disciplinas';
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || 'Não foi possível salvar a disciplina.');
      return;
    }

    if (editingCodigo) {
      setItems((current) => current.map((item) => (item.codigo === editingCodigo ? data.disciplina : item)));
      setStatus('Disciplina atualizada com sucesso.');
    } else {
      setItems((current) => [data.disciplina, ...current]);
      setStatus('Disciplina cadastrada com sucesso.');
    }

    setForm(emptyForm);
    setEditingCodigo(null);
  };

  const handleEdit = (disciplina: Disciplina) => {
    setForm({
      codigo: disciplina.codigo,
      nome: disciplina.nome,
      cargaHoraria: String(disciplina.cargaHoraria),
    });
    setEditingCodigo(disciplina.codigo);
    setStatus('');
  };

  const handleDelete = async (codigo: string) => {
    if (!window.confirm('Deseja remover esta disciplina?')) {
      return;
    }

    const response = await fetch(`/api/disciplinas/${encodeURIComponent(codigo)}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || 'Não foi possível remover a disciplina.');
      return;
    }

    setItems((current) => current.filter((item) => item.codigo !== codigo));
    setStatus('Disciplina removida com sucesso.');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">{editingCodigo ? 'Editar disciplina' : 'Nova disciplina'}</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input value={form.codigo} onChange={(event) => setForm({ ...form, codigo: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Código" disabled={Boolean(editingCodigo)} />
          <input value={form.nome} onChange={(event) => setForm({ ...form, nome: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Nome" />
          <input value={form.cargaHoraria} onChange={(event) => setForm({ ...form, cargaHoraria: event.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Carga horária" type="number" />
          <div className="flex gap-3">
            <button type="submit" className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">{editingCodigo ? 'Salvar alterações' : 'Cadastrar'}</button>
            {editingCodigo ? (
              <button type="button" onClick={() => { setForm(emptyForm); setEditingCodigo(null); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                Cancelar
              </button>
            ) : null}
          </div>
        </form>
        {status ? <p className="mt-4 text-sm text-slate-600">{status}</p> : null}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Disciplinas cadastradas</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-3 py-2">Código</th>
                <th className="px-3 py-2">Nome</th>
                <th className="px-3 py-2">Carga horária</th>
                <th className="px-3 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((disciplina) => (
                <tr key={disciplina.codigo} className="border-t border-slate-200">
                  <td className="px-3 py-3">{disciplina.codigo}</td>
                  <td className="px-3 py-3">{disciplina.nome}</td>
                  <td className="px-3 py-3">{disciplina.cargaHoraria}h</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(disciplina)} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">Editar</button>
                      <button onClick={() => handleDelete(disciplina.codigo)} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Excluir</button>
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
