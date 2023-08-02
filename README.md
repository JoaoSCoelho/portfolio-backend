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

1. Crie um arquivo chamado `.env` na raíz do projeto conforme o padrão em [`.env.example`](.env.example) e defina suas variáveis de ambiente. (variáveis com a palavra `TEST` só são necessárias se for rodar o comando de testes)
   * ❕ **PARA QUEM ESTÁ USANDO O MONGODB ATLAS**: Nas variáveis que for necessário o `MONGO_URI`, lembre-se de substituir `<password>` pela senha do database.

2. Na pasta raíz do projeto, execute:

```bash
# Para rodar o servidor em modo de desenvolvimento, com re-run automático quando arquivos forem alterados
$ npm run dev

# Para criar uma build do projeto em JavaScript
$ npm run build

# Para executar a build do projeto
$ npm run start

# Para executar os testes automatizados
$ npm run test
```

Agora você já pode acessar: `http://localhost:{ENV.PORT}`

Você pode usar algum programa para testar as requisições, como por exemplo o [Insômnia](https://insomnia.rest/download).

[Insômnia collection](resources/Insomnia_2023-08-02.json) - Coleção de requisições da API no Insômnia

## Status
> **🚧 Em construção... 🚧 v0.0.1**

### Features

- [x] Testes unitários

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

## Tecnologias utilizadas

Muitos conceitos de **Clean Architecture** e **S.O.L.I.D** foram aplicados nessa aplicação

<div style="display: inline-block">
  <img src="resources/node.png" style="width: 50px; height: 50px; vertical-align: middle;" title="Node" alt="Node logo">
  <img src="resources/typescript-logo.svg.png" style="width: 50px; vertical-align: middle;" title="TypeScript" alt="TypeScript logo">
  <img src="resources/express.png" style="width: 50px; background-color: white; border-radius: 9999px; vertical-align: middle;" title="Express" alt="Express logo">
  <img src="resources/mongodb.png" style="width: 50px; height: 50px; vertical-align: middle;" title="MongoDB" alt="MongoDB logo">
  <img src="resources/jest.png" style="width: 50px; height: 50px; vertical-align: middle;" title="Jest" alt="Jest logo">
</div>

Node.JS | TypeScript | Express | MongoDB | Jest |
