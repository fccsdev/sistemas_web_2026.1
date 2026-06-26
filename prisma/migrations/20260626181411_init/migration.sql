-- CreateTable
CREATE TABLE "Professor" (
    "matricula" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cargaHoraria" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ProfessorDisciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "professorMatricula" TEXT NOT NULL,
    "disciplinaCodigo" TEXT NOT NULL,
    CONSTRAINT "ProfessorDisciplina_professorMatricula_fkey" FOREIGN KEY ("professorMatricula") REFERENCES "Professor" ("matricula") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProfessorDisciplina_disciplinaCodigo_fkey" FOREIGN KEY ("disciplinaCodigo") REFERENCES "Disciplina" ("codigo") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "professorMatricula" TEXT NOT NULL,
    "disciplinaCodigo" TEXT NOT NULL,
    "codigoTurma" TEXT NOT NULL,
    "semestre" TEXT NOT NULL,
    "numeroAlunos" INTEGER NOT NULL,
    "horario" TEXT NOT NULL,
    CONSTRAINT "Turma_professorMatricula_fkey" FOREIGN KEY ("professorMatricula") REFERENCES "Professor" ("matricula") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Turma_disciplinaCodigo_fkey" FOREIGN KEY ("disciplinaCodigo") REFERENCES "Disciplina" ("codigo") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessorDisciplina_professorMatricula_disciplinaCodigo_key" ON "ProfessorDisciplina"("professorMatricula", "disciplinaCodigo");
