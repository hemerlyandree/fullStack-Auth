# Fullstack Auth

API com **autenticação e autorização via JWT**, construída com Node.js, Express e TypeScript. O projeto possui rotas públicas e protegidas, controle de acesso por perfil (roles) e foi testado com o **Insomnia**.

## Funcionalidades

- Autenticação com login (usuário e senha) e geração de token JWT
- Middleware de autenticação que valida o token em rotas protegidas
- Middleware de autorização que restringe rotas por perfil (ex.: `admin`)
- Tratamento centralizado de erros com classe `AppError`
- Variáveis de ambiente carregadas via `--env-file`
- Imports com alias (`@/`)

## Tecnologias

- [Node.js](https://nodejs.org/) (v20.6 ou superior)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [tsx](https://github.com/privatenumber/tsx)
- [Insomnia](https://insomnia.rest/) (testes da API)

## Estrutura do projeto

```
src/
├── configs/
│   └── auth.ts                 # Configurações do JWT (secret e expiração)
├── controllers/
│   └── sessions-controller.ts  # Login e geração do token
├── middlewares/
│   ├── ensure-authenticated.ts       # Valida o token JWT
│   └── verify-user-authorization.ts  # Valida o perfil do usuário
├── routes/                     # Definição das rotas
├── types/
│   └── express.d.ts            # Tipagem de request.user
├── utils/
│   └── AppError.ts             # Classe de erros da aplicação
└── server.ts                   # Ponto de entrada
```


### Códigos de resposta

| Status | Significado                                       |
| ------ | ------------------------------------------------- |
| 200    | Requisição realizada com sucesso                  |
| 401    | Não autenticado (token ausente, inválido ou credenciais incorretas) |
| 403    | Autenticado, mas sem permissão para o recurso     |

## Rotas

> Ajuste conforme as rotas que existem no seu projeto.

| Método | Rota        | Acesso                | Descrição                      |
| ------ | ----------- | --------------------- | ------------------------------ |
| POST   | `/sessions` | Pública               | Realiza login e retorna o token |
| GET    | `/...`      | Autenticado           | Exemplo de rota protegida      |
| GET    | `/...`      | Autenticado + `admin` | Exemplo de rota restrita a admin |

### Exemplo de login

**Requisição**

```http
POST /sessions
Content-Type: application/json

{
  "username": "joao",
  "password": "123456"
}
```

**Resposta**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> O usuário acima é fictício e usado apenas para fins de estudo.

## Testando com o Insomnia

1. Abra o Insomnia e crie uma nova requisição `POST` para `http://localhost:3333/sessions`.
2. No corpo (JSON), envie `username` e `password`.
3. Copie o `token` retornado.
4. Nas rotas protegidas, vá em **Auth → Bearer Token** e cole o token.
5. Envie a requisição e verifique a resposta.

## Scripts

| Script        | Descrição                                   |
| ------------- | ------------------------------------------- |
| `npm run dev` | Inicia o servidor em modo de desenvolvimento |

## Aprendizados

Este projeto foi desenvolvido para estudo e prática de:

- Autenticação e autorização com JWT
- Criação de middlewares no Express
- Tipagem de extensões do Express com TypeScript
- Tratamento de erros personalizado
- Testes de API com Insomnia

## Autor

Feito por **André Hemerly*.

