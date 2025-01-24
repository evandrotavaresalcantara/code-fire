import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0", // versão do OpenAPI
    info: {
      title: "Bucket API",
      version: "1.0.0",
      description:
        "Documentação da API para o Bucket de armazenamento de arquivos estáticos públicos e arquivos privado de usuários",
    },
    servers: [
      {
        url: "http://localhost:7000", // URL do seu servidor
      },
    ],
  },
  apis: ["./src/controllers/**/*.ts"], // Caminho para os arquivos onde as anotações estão
};

export default options;
