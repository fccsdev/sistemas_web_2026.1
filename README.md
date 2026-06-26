# University Department Management System

A web system for managing a university department, including professors, disciplines, qualifications, classes, and operational queries.

## Overview

The application provides a centralized workflow for administrative staff to maintain academic department records and review related information without relying on separate tools.

## Features

- Manage professors
- Manage disciplines
- Register professor-discipline qualifications
- Create and maintain classes
- Review professors by discipline
- Review disciplines by professor with aggregation results

## Technologies

- Next.js
- TypeScript
- Prisma
- SQLite
- Tailwind CSS

## Installation

```bash
npm install
```

## Running the project

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

The application will be available at http://127.0.0.1:3000.

## Database

The project uses SQLite with Prisma. The data model is defined in prisma/schema.prisma and includes the following entities:

- Professor
- Disciplina
- ProfessorDisciplina
- Turma

## API

The application exposes the following API routes:

- GET /api/professores
- POST /api/professores
- PUT /api/professores/[matricula]
- DELETE /api/professores/[matricula]
- GET /api/disciplinas
- POST /api/disciplinas
- PUT /api/disciplinas/[codigo]
- DELETE /api/disciplinas/[codigo]
- GET /api/aptidoes
- POST /api/aptidoes
- GET /api/turmas
- POST /api/turmas
- PUT /api/turmas/[id]
- DELETE /api/turmas/[id]
- GET /api/consultas/professores-por-disciplina/[codigo]
- GET /api/consultas/disciplinas-por-professor/[matricula]

## Project structure

- app/: application pages and API routes
- components/: interface components
- lib/: shared application configuration
- prisma/: schema, migrations, and seed data
- public/: static assets
