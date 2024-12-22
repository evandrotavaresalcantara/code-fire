import { EntidadeSchema } from "./EntidadeSchema";

export interface PermissaoSchema extends EntidadeSchema {
  nome: string;
  descricao: string;
  data_criacao: Date;
  ativo: boolean;
}
