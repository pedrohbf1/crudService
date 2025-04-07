
# 📦 CrudService & consulta - Serviço de Acesso ao Banco PostgreSQL

Este módulo é uma implementação genérica de um CRUD (Create, Read, Update, Delete) usando **Node.js + TypeScript + PostgreSQL**, permitindo realizar operações no banco de forma reutilizável e segura.

---

## 📁 Estrutura de Arquivos

- `CrudService`: Classe que encapsula todas as operações CRUD.
- `consulta`: Função utilitária que executa queries SQL com tratamento de erros.
- `db`: Configuração de conexão com o PostgreSQL usando o `pg.Client`.

---

## 🚀 CrudService

Classe responsável por abstrair as operações no banco de dados.

### Métodos

| Método              | Descrição                                                                 |
|---------------------|--------------------------------------------------------------------------|
| `getAll<T>`         | Busca todos os registros da tabela informada.                            |
| `createRecord<T>`   | Insere um novo registro com os campos fornecidos.                        |
| `updateRecord`      | Atualiza um registro específico com os dados fornecidos.                 |
| `deleteById`        | Remove um registro da tabela baseado no campo `id`.                      |
| `deleteByField`     | Remove um registro da tabela baseado em outro campo personalizado.       |
| `getByField<T>`     | Retorna um registro filtrando por uma coluna específica.                 |

### Exemplo de uso

```ts
import crud from './CrudService';

// Buscar todos os usuários
const usuarios = await crud.getAll({ table: 'usuarios' });

// Criar novo usuário
await crud.createRecord({
  table: 'usuarios',
  fields: { nome: 'Pedro', idade: 28 }
});

// Atualizar usuário
await crud.updateRecord({
  table: 'usuarios',
  fields: { nome: 'Pedro Atualizado' },
  idTable: 1,
  column: 'id'
});

// Deletar por ID
await crud.deleteById({ table: 'usuarios', idTable: 1 });

// Buscar por coluna
await crud.getByField({ table: 'usuarios', column: 'email', idTable: 'pedro@email.com' });
```

---

## 🛠 consulta

Função genérica que executa uma query SQL com tratamento de erros e retorno tipado.

### Parâmetros

| Parâmetro        | Tipo              | Descrição                                  |
|------------------|-------------------|---------------------------------------------|
| `sql`            | `string`          | Query SQL a ser executada                   |
| `valores`        | `any[]`           | Valores a serem passados para a query       |
| `mensagemReject` | `string`          | Mensagem personalizada de erro (opcional)   |

### Exemplo

```ts
const usuarios = await consulta({
  sql: 'SELECT * FROM usuarios WHERE id = $1',
  valores: [1],
  mensagemReject: 'Erro ao buscar usuário'
});
```

---

## 🔐 Conexão com o Banco de Dados

A conexão é feita via `pg.Client` com SSL ativado:

```ts
const db = new Client({
  user: 'pedrohbfreitas',
  host: 'devPedro',
  database: 'pedro_pg',
  password: 'devPedro-senha',
  port: 5432,
  ssl: {
    rejectUnauthorized: true, // Exige certificado válido
  },
});
```

> ⚠️ Certifique-se de que o banco de dados está configurado para aceitar conexões SSL se essa opção estiver habilitada.

---

## ✅ Requisitos

- Node.js
- PostgreSQL
- TypeScript
- Biblioteca `pg` instalada:
```bash
npm install pg
```

---

## ✨ Vantagens

- Código reutilizável para múltiplas tabelas
- SQL parametrizado (evita SQL Injection)
- Fácil de manter e escalar
- Tipagem forte com TypeScript
