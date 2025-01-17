# PROJETO EQUIPES2 - CODE-FIRE

## INSTALAÇÃO/USO MODO DEV

- Instalar docker e docker compose no sistema operacional.

- copiar arquivo de exemplo env-example.env para .env da API e configurar principalmente o DATABASE_URL com o seguinte comando:
  `cp apps/api/env-example.env apps/api/.env`

### Comandos executados na raiz do projeto

- executar o container com o banco de dados:
  `npm run docker:dev:start`

- instalar os pacotes com o comando:
  `npm run install`

- atualizar tipos do prisma com o comando:
  `npm run prisma`

- executar a API com o comando:
  `npm run api`

## BucketSC

O buckestSc é um sistema de armazenamento de arquivos, que está inserido no projeto para
consumir o sistema de autenticação desenvolvido pelo equipe code-fire.

O sistema bucketSC utiliza o sistema mongoDB e uma interface de cliente mongo/express
que pode ser acessado através do http://localhost:8087/

### Comandos executados no diretório apps/bucketSC

Inicializar: acessar diretório apps/bucketSC

- instalar os pacotes com o comando:
  `npm run install`

- executar bucketSC:
  `npm run dev`

- acesso swagger  
  http://localhost:7000/v1/docs/

  Atualmente o backetSc está rodando de forma autônoma sem integração
  com projeto de autenticação. Dessa forma qualquer interação será diretamente
  com o backetSc via os endpoints expostos de acordo com swagger.

  Os arquivos são armazenados no diretório rootFolder na raiz do projeto bucketSC.

### Obs

- Se precisar parar o container do banco de dados: `npm run docker:dev:stop`
- Se precisar destruir o container do banco de dados: `npm run docker:dev:down`

## INSTALAÇÃO/USO MODO PRODUÇÃO

> Em breve...
