# PROJETO EQUIPES2 - CODE-FIRE

## INSTALAÇÃO/USO MODO DEV

- Instalar docker e docker compose no sistema operacional.

- copiar arquivo de exemplo env-example.env para .env da API e configurar principalmente o DATABASE_URL com o seguinte comando:
  `cp apps/api/env-example.env apps/api/.env`

- executar o container com o banco de dados:
  `npm run docker:dev:start`

- executar a API com o comando:
  `npm run api`

### Obs

- Se precisar parar o container do banco de dados: `npm run docker:dev:stop`
- Se precisar destruir o container do banco de dados: `npm run docker:dev:down`

## INSTALAÇÃO/USO MODO PRODUÇÃO

> Em breve...