# Mini Twitter

Aplicação de microblogging inspirada no Twitter, construída com React, TypeScript e Tailwind CSS.

## Tecnologias

### Frontend
- **React 19** - Biblioteca de UI
- **TypeScript** - Superset tipado de JavaScript
- **Tailwind CSS** - Framework de estilização com classes utilitárias
- **React Router** - Roteamento de páginas
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **TanStack Query (React Query)** - Gerenciamento de estado assíncrono e cache
- **Zustand** - Gerenciamento de estado global
- **Lucide React** - Biblioteca de ícones
- **react-intersection-observer** - Detecção de scroll para infinite loading

### Backend (referência)
- **Bun/Elysia** - Framework web (API)
- **JWT** - Autenticação por tokens

## Funcionalidades

- [x] Autenticação (login/registro)
- [x] Persistência de sessão com localStorage
- [x] Criação de posts com título, conteúdo e imagem (base64)
- [x] Feed de posts com scroll infinito
- [x] Curtir posts
- [x] Excluir posts (apenas autor)
- [x] Busca de posts por termo
- [x] Modo claro/escuro
- [x] Interface responsiva
- [x] Toast notifications

## Como Rodar

### Pré-requisitos

- Node.js 18+ ou Bun
- npm ou bun

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd mini-twitter

# Instale as dependências
npm install
# ou
bun install
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
API_ENDPOINT=http://localhost:3000
```

### Rodando o Projeto

```bash
# Modo desenvolvimento
npm run dev
# ou
bun run dev

# Build para produção
npm run build
# ou
bun run build
```

### Backend

O projeto depende de uma API backend. Certifique-se de ter o servidor rodando em `http://localhost:3000` (ou a URL configurada em `API_ENDPOINT`).

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de UI (Button, Input, Toast, etc.)
│   ├── Composer.tsx    # Componente de criação de posts
│   └── ...
├── contexts/            # React Contexts
│   └── ToastContext.tsx # Sistema de notificações
├── features/            # Features organizadas por domínio
│   ├── auth/           # Autenticação
│   │   ├── components/  # Login, Registro, ProtectedRoute
│   │   ├── pages/      # AuthPage
│   │   ├── hooks/       # useLoginMutation, useRegisterMutation, useLogoutMutation
│   │   ├── queries.ts   # Mutations de autenticação
│   │   ├── schemas.ts   # Schemas Zod
│   │   ├── store.ts     # Zustand store
│   │   └── types.ts     # Tipos TypeScript
│   ├── layout/          # Layout da aplicação
│   │   └── Layout.tsx   # Navbar, Footer
│   └── posts/           # Posts
│       ├── components/  # PostCard, PostsFeed, PostsPage
│       ├── hooks/        # usePosts, useCreatePost, useDeletePost, useLikePost
│       ├── stores/       # Zustand store
│       └── schemas.ts    # Schemas Zod
├── hooks/               # Hooks globais
├── lib/                 # Configurações e utilitários
│   ├── api-client.ts    # Instância Axios
│   └── query-client.ts  # React Query client
└── utils/               # Funções utilitárias
    ├── api.ts           # Tratamento de erros da API
    └── date.ts          # Formatação de datas
```

## API Endpoints

| Método | Endpoint | Descrição |
|--------|---------|-----------|
| GET | `/posts?page=1&search=termo` | Lista posts (paginado) |
| POST | `/posts` | Cria post |
| DELETE | `/posts/:id` | Deleta post |
| POST | `/posts/:id/like` | Curtir/descurtir post |
| POST | `/auth/login` | Login |
| POST | `/auth/register` | Registro |
| POST | `/auth/logout` | Logout |

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Roda em modo desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview do build |
| `npm run test` | Roda testes |

## Licença

MIT
