# 🧪 Avivia — Plataforma para Prescritores e Pacientes

Este projeto é uma aplicação web desenvolvida para facilitar o acesso a materiais técnicos e científicos por prescritores, além de possibilitar o gerenciamento de conteúdos por parte do administrador.

## 🚀 Funcionalidades

- Cadastro e login de prescritores
- Login de administrador
- Área restrita com acesso a:
  - E-books
  - Estudos científicos (por patologia)
  - Certificados de análise
- CRUD completo de conteúdos para o administrador
- Página pública de certificados (consulta por número de lote)
- Blog público com posts científicos
- Formulário de feedback

## 🛠️ Tecnologias utilizadas

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Banco de dados:** PostgreSQL
- **ORM:** Nenhum (consultas manuais via `pg`)
- **Estilização:** CSS puro
- **Gerenciamento de rotas:** React Router DOM
- **Autenticação:** JWT
- **Segurança:** Bcrypt para senhas
