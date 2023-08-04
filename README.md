# portfolio-backend

API do meu portfolio de projetos pessoais

Tabela de conteúdos
=

- [portfolio-backend](#portfolio-backend)
- [Tabela de conteúdos](#tabela-de-conteúdos)
  - [Instalação](#instalação)
  - [Como rodar](#como-rodar)
  - [Status](#status)
    - [Features](#features)
  - [Licença](#licença)
  - [Tecnologias utilizadas](#tecnologias-utilizadas)

## Instalação

1. Você precisa do [Git](https://git-scm.com) e do [Node.JS](https://nodejs.org/) instalados na sua máquina (recomendo Node >=18.0.0).

```bash
# Clone este repositório
$ git clone <https://github.com/JoaoSCoelho/portfolio-backend>

# Acesse a pasta do projeto no terminal/cmd
$ cd portfolio-backend

# Instale as dependências
$ npm install
```

2. Você precisa ter um servidor mongodb rodando, para isso você pode usar o [MongoDB Atlas](https://www.mongodb.com/atlas), para isso bastar seguir os passos em [Usando MongoDB Atlas](docs/criando-mongodb-on-atlas.md), ou rodar um servidor mongodb localmente na sua máquina: passo a passo para isso em [Rodando MongoDB localmente](docs/instalacao-mongodb-community.md)

## Como rodar

1. Crie um arquivo chamado `.env` na raíz do projeto conforme o padrão em [`.env.example`](.env.example) e defina suas variáveis de ambiente. (variáveis que começem com a palavra `TEST` só são necessárias se for rodar o comando de testes)
   * ❕ **PARA QUEM ESTÁ USANDO O MONGODB ATLAS**: Nas variáveis que for necessário o `MONGO_URI`, lembre-se de substituir `<password>` pela senha do database.

2. Na pasta raíz do projeto, execute:

```bash
# Para rodar o servidor em modo de desenvolvimento, com re-run automático quando arquivos forem alterados
$ npm run dev

# Para criar uma build do projeto em JavaScript
$ npm run build

# Para executar a build do projeto
$ npm run start

# Para executar os testes unitários
$ npm run test:unit

# Para executar os testes funcionais
$ npm run test:e2e

# Para executar os testes do banco de dados
$ npm run test:db

# Para rodar todos os testes (exceto banco de dados)
$ npm run test:all
```

Agora você já pode acessar: `http://localhost:{ENV.PORT}`

Você pode usar algum programa para testar as requisições, como por exemplo o [Insômnia](https://insomnia.rest/download).

[Insômnia collection](resources/Insomnia_2023-08-03.json) - Coleção de requisições da API no Insômnia

## Status
> **🚧 Em construção... 🚧 v0.0.2**

### Features

- [x] Testes unitários
- [x] Testes funcionais
- [ ] Rotas
  - [ ] Help
  - [x] Create project
  - [x] Get projects
  - [x] Create technology
- [x] Criar snippets

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

## Tecnologias utilizadas

Muitos conceitos de **Clean Architecture** e **S.O.L.I.D** foram aplicados nessa aplicação

<div style="display: inline-block">

![Node logo](resources/node.png)
![TypeScript logo](resources/typescript-logo.svg.png)
![Express logo](resources/express.png)
![MongoDB logo](resources/mongodb.png)
![Jest logo](resources/jest.png)
</div>

Node.JS | TypeScript | Express | MongoDB | Jest |
