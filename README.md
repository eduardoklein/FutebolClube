# Futebol Clube

Projeto desenvolvido como parte do curso da Trybe, com o objetivo de criar uma API RESTful para gerenciamento de partidas e times de futebol.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Endpoints](#endpoints)
- [Testes](#testes)

## Sobre o Projeto

O Futebol Clube é uma aplicação backend que permite o cadastro de times, gerenciamento de partidas e autenticação de usuários. O projeto utiliza arquitetura MSC (Model-Service-Controller) e segue boas práticas de desenvolvimento.

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Sequelize (ORM)
- MySQL
- JWT (JSON Web Token)
- Docker

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/futebol-clube.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd futebol-clube
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente no arquivo `.env`.
5. Inicie o banco de dados (Docker recomendado):
   ```bash
   docker-compose up -d
   ```
6. Execute a aplicação:
   ```bash
   npm start
   ```

## Como Usar

A API estará disponível em `http://localhost:3001`. Utilize ferramentas como Postman ou Insomnia para realizar requisições.

## Endpoints

- `POST /login` - Autenticação de usuário
- `GET /teams` - Lista todos os times
- `GET /teams/:id` - Detalhes de um time
- `GET /matches` - Lista todas as partidas
- `POST /matches` - Cria uma nova partida
- `PATCH /matches/:id/finish` - Finaliza uma partida
- `PATCH /matches/:id` - Atualiza o placar de uma partida

## Testes

Para rodar os testes, utilize:

```bash
npm test
```
