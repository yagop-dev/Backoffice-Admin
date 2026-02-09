# Backoffice Administrativo (Frontend)

Este projeto é um mini backoffice administrativo desenvolvido como teste técnico, simulando um sistema interno de gestão.  
Os dados são consumidos a partir de arquivos JSON locais, simulando uma API real.

---

## 🎯 Objetivo

Construir uma aplicação administrativa com múltiplas telas, tipagem forte e operações comuns de sistemas reais, utilizando React + TypeScript, com foco em organização, clareza de código e estados de interface.

---

## ▶️ Como rodar o projeto

1. Clone o repositório:
git clone https://github.com/seu-usuario/seu-repo.git

2. Instale as dependências:
npm install

3.Rode o projeto:
npm run dev

---

## 📁 Estrutura do projeto

src/
├── components/ # Componentes reutilizáveis (Header, Loading, Error, Tables, etc)
├── pages/ # Páginas da aplicação (Dashboard, Users, Orders, Commissions)
├── services/ # Camada de acesso a dados (fetchData)
├── utils/ # Funções utilitárias (estatísticas e cálculos)
├── types/ # Tipagens TypeScript
├── data/ # JSONs simulando backend
└── App.tsx # Configuração de rotas e layout principal

---

## 📦 Simulação de backend

Os dados são carregados a partir de arquivos JSON locais:

- `users.json`
- `orders.json`
- `commissions.json`

Esses arquivos são tratados como respostas de uma API, incluindo:
- Estado de loading
- Tratamento de erro
- Transformação e agregação de dados no frontend

---

## 🧠 Decisões técnicas

- Uso da Fetch API em vez de Axios

Foi utilizada a Fetch API por ser nativa do navegador e suficiente para o escopo do projeto, evitando dependências externas desnecessárias.
Como não há necessidade de interceptors, cancelamento de requisições ou configurações avançadas, o uso de Fetch mantém o código mais leve, explícito e fácil de entender.

- Separação de responsabilidades

A lógica de cálculo e agregação de dados (como totais, somatórios e filtros) foi extraída para funções utilitárias, evitando duplicação de código e mantendo os componentes focados apenas na renderização e no controle de estado.

- Gerenciamento de estado local com React Hooks

O estado da aplicação foi mantido localmente utilizando useState e useEffect, pois o escopo do projeto não justifica a adoção de soluções globais.
Essa escolha reduz a complexidade e mantém o código mais simples e fácil de manter.

- Componentização e reutilização

Componentes como tabelas, filtros, loading e mensagens de erro foram isolados para promover reutilização, consistência visual e facilitar a manutenção e evolução do código.

---

## 🚧 Pontos de melhoria

- Persistência das alterações em localStorage ou backend real
- Paginação nas listagens
- Utilização de mais types (Para os filtros por exemplo)
- Autenticação e controle de permissões

## 🖥️ Funcionalidades implementadas

### Dashboard
- Total de usuários
- Usuários ativos
- Total de pedidos
- Soma do valor dos pedidos
- Soma do valor das comissões

### Usuários
- Listagem de usuários
- Filtro por status e tipo
- Busca por nome ou email
- Navegação para detalhe do usuário
- Edição de dados e status no estado local

### Pedidos
- Listagem de pedidos
- Filtro por status
- Ordenação por data ou valor
- Detalhe do pedido
- Alteração de status e recálculo de valores no frontend

### Comissões
- Listagem de comissões
- Filtro por status
- Totalizador de valores
- Relacionamento com usuários e pedidos

---

## UI / UX

- Uso consistente do shadcn/ui
- Layout simples e funcional
- Estados obrigatórios implementados:
  - Loading
  - Erro
  - Empty state
- Navegação clara entre telas

---

## 🧰 Stack utilizada

- React
- TypeScript
- React Router DOM
- Tailwind CSS
- shadcn/ui
- Fetch API
- JSON local simulando backend

---