'use client';

import { useState } from 'react';
import type { Disciplina, Professor } from '@prisma/client';

type ConsultaProfessorPorDisciplina = {
  matricula: string;
  nome: string;
  email: string;
  telefone: string;
};

type ConsultaDisciplinaPorProfessor = {
  nomeDisciplina: string;
  quantidadeTurmas: number;
  cargaHoraria: number;
  cargaHorariaTotal: number;
  totalAlunos: number;
};

type ConsultasPanelProps = {
  disciplinas: Disciplina[];
  professores: Professor[];
};

export function ConsultasPanel({ disciplinas, professores }: ConsultasPanelProps) {
  const [disciplinaCodigo, setDisciplinaCodigo] = useState('');
  const [professorMatricula, setProfessorMatricula] = useState('');
  const [professoresPorDisciplina, setProfessoresPorDisciplina] = useState<ConsultaProfessorPorDisciplina[]>([]);
  const [disciplinasPorProfessor, setDisciplinasPorProfessor] = useState<ConsultaDisciplinaPorProfessor[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarProfessoresPorDisciplina = async () => {
    if (!disciplinaCodigo) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/consultas/professores-por-disciplina/${encodeURIComponent(disciplinaCodigo)}`);
      if (!response.ok) {
        setProfessoresPorDisciplina([]);
        return;
      }

      const data = await response.json();
      setProfessoresPorDisciplina(data.professores || []);
    } catch {
      setProfessoresPorDisciplina([]);
    } finally {
      setLoading(false);
    }
  };

  const buscarDisciplinasPorProfessor = async () => {
    if (!professorMatricula) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/consultas/disciplinas-por-professor/${encodeURIComponent(professorMatricula)}`);
      if (!response.ok) {
        setDisciplinasPorProfessor([]);
        return;
      }

      const data = await response.json();
      setDisciplinasPorProfessor(data.disciplinas || []);
    } catch {
      setDisciplinasPorProfessor([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Professores por disciplina</h2>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-slate-700">Selecione uma disciplina</label>
            <select value={disciplinaCodigo} onChange={(event) => setDisciplinaCodigo(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
              <option value="">Selecione</option>
              {disciplinas.map((disciplina) => (
                <option key={disciplina.codigo} value={disciplina.codigo}>
                  {disciplina.nome}
                </option>
              ))}
            </select>
          </div>
          <button onClick={buscarProfessoresPorDisciplina} className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">Consultar</button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-3 py-2">Matrícula</th>
                <th className="px-3 py-2">Nome</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {professoresPorDisciplina.map((professor) => (
                <tr key={professor.matricula} className="border-t border-slate-200">
                  <td className="px-3 py-3">{professor.matricula}</td>
                  <td className="px-3 py-3">{professor.nome}</td>
                  <td className="px-3 py-3">{professor.email}</td>
                  <td className="px-3 py-3">{professor.telefone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && !professoresPorDisciplina.length ? <p className="mt-4 text-sm text-slate-600">Carregando...</p> : null}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Disciplinas por professor</h2>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-slate-700">Selecione um professor</label>
            <select value={professorMatricula} onChange={(event) => setProfessorMatricula(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2">
              <option value="">Selecione</option>
              {professores.map((professor) => (
                <option key={professor.matricula} value={professor.matricula}>
                  {professor.nome}
                </option>
              ))}
            </select>
          </div>
          <button onClick={buscarDisciplinasPorProfessor} className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">Consultar</button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-3 py-2">Disciplina</th>
                <th className="px-3 py-2">Quantidade de turmas</th>
                <th className="px-3 py-2">Carga horária</th>
                <th className="px-3 py-2">Carga horária total</th>
                <th className="px-3 py-2">Total de alunos</th>
              </tr>
            </thead>
            <tbody>
              {disciplinasPorProfessor.map((disciplina) => (
                <tr key={disciplina.nomeDisciplina} className="border-t border-slate-200">
                  <td className="px-3 py-3">{disciplina.nomeDisciplina}</td>
                  <td className="px-3 py-3">{disciplina.quantidadeTurmas}</td>
                  <td className="px-3 py-3">{disciplina.cargaHoraria}h</td>
                  <td className="px-3 py-3">{disciplina.cargaHorariaTotal}h</td>
                  <td className="px-3 py-3">{disciplina.totalAlunos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && !disciplinasPorProfessor.length ? <p className="mt-4 text-sm text-slate-600">Carregando...</p> : null}
      </section>
    </div>
  );
}
