# PROJETO EQUIPES2 - CODE-FIRE

## INSTALAÇÃO/USO MODO DEV

- Instalar docker e docker compose no sistema operacional.

- copiar arquivo de exemplo env-example.env para .env da API e configurar principalmente o DATABASE_URL com o seguinte comando:
  `cp apps/api/env-example.env apps/api/.env`

> Os valores que já estão em DATABASE_URL, BASE_URL, CORS_ORIGIN, já estão com as opções padrão ajustadas para a configuração que está no docker-compose.dev.yml

### Aplicação Principal - S3curity

#### Comandos executados na raiz do projeto

- executar os containers com o banco de dados(postgres), rabbitmq, mongodb e mongo-express:
  `npm run docker:dev:start`

- instalar os pacotes com o comando:
  `npm run install`

- atualizar tipos do prisma com o comando:
  `npm run prisma`

- executar a API com o comando:
  `npm run api`

#### Utilizar a Interface S3curityAdmin

Interface idealizada para o usuário do tipo s3curityadmin realizar a gestão de novos usuário, perfis e permissões.

O sistema pode ser acessado através do `http://localhost:3000`

- Usuário Administrador inicial: `admin@admin.com`

- senha: `@Admin1`

- formulário para cadastro de novo usuário fora da área admin: `accounts/register`
  > Esse formulário apenas usuários securytiAdmin conseguem acessar para cadastro

### Micro Serviço Armazenamento Arquivos - BucketSC

O buckestSC é um sistema de armazenamento de arquivos, que está inserido no projeto para
consumir o sistema de autenticação desenvolvido pelo equipe code-fire e servir de servidor
de arquivos estáticos com otimização na entrega das imagens dos usuários cadastrados.

O sistema bucketSC utiliza o sistema mongoDB e uma interface de cliente mongo/express
que pode ser acessado através do `http://localhost:8087/`

#### Comandos executados no diretório apps/bucketSC

Inicializar: acessar diretório apps/bucketSC

- instalar os pacotes com o comando:
  `npm run install`

- executar bucketSC:
  `npm run dev`

- acesso documentação pelo swagger
  `http://localhost:7000/v1/docs/`

  Atualmente o bucketSC está rodando de forma autônoma sem integração
  com projeto de autenticação. Dessa forma qualquer interação será diretamente
  com o bucketSC via os endpoints expostos de acordo com swagger.

  Os arquivos são armazenados no diretório rootFolder na raiz do projeto bucketSC.

### Obs

- Se precisar parar os containers: `npm run docker:dev:stop`
- Se precisar destruir os containers: `npm run docker:dev:down`

## INSTALAÇÃO/USO MODO PRODUÇÃO

> Em breve...
