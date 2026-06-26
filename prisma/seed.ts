import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.professorDisciplina.deleteMany();
  await prisma.turma.deleteMany();
  await prisma.professor.deleteMany();
  await prisma.disciplina.deleteMany();

  const professores = [
    { matricula: 'P1001', nome: 'Ana Souza', email: 'ana.souza@uni.edu.br', telefone: '(85) 98765-1001' },
    { matricula: 'P1002', nome: 'Bruno Lima', email: 'bruno.lima@uni.edu.br', telefone: '(85) 98765-1002' },
    { matricula: 'P1003', nome: 'Carla Mendes', email: 'carla.mendes@uni.edu.br', telefone: '(85) 98765-1003' },
  ];

  const disciplinas = [
    { codigo: 'D1001', nome: 'Algoritmos', cargaHoraria: 60 },
    { codigo: 'D1002', nome: 'Banco de Dados', cargaHoraria: 80 },
    { codigo: 'D1003', nome: 'Redes de Computadores', cargaHoraria: 70 },
  ];

  await prisma.professor.createMany({ data: professores });
  await prisma.disciplina.createMany({ data: disciplinas });

  await prisma.professorDisciplina.createMany({
    data: [
      { professorMatricula: 'P1001', disciplinaCodigo: 'D1001' },
      { professorMatricula: 'P1001', disciplinaCodigo: 'D1002' },
      { professorMatricula: 'P1002', disciplinaCodigo: 'D1002' },
      { professorMatricula: 'P1002', disciplinaCodigo: 'D1003' },
      { professorMatricula: 'P1003', disciplinaCodigo: 'D1001' },
      { professorMatricula: 'P1003', disciplinaCodigo: 'D1003' },
    ],
  });

  const horarios = ['Manha', 'Tarde', 'Noite'];
  await prisma.turma.createMany({
    data: [
      {
        professorMatricula: 'P1001',
        disciplinaCodigo: 'D1001',
        codigoTurma: 'T-101',
        semestre: '2026.1',
        numeroAlunos: 35,
        horario: horarios[0],
      },
      {
        professorMatricula: 'P1002',
        disciplinaCodigo: 'D1002',
        codigoTurma: 'T-202',
        semestre: '2026.1',
        numeroAlunos: 28,
        horario: horarios[1],
      },
      {
        professorMatricula: 'P1003',
        disciplinaCodigo: 'D1003',
        codigoTurma: 'T-303',
        semestre: '2026.1',
        numeroAlunos: 40,
        horario: horarios[2],
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
