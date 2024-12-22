import { EntidadeSchema } from "./EntidadeSchema";

export interface PerfilSchema extends EntidadeSchema {
  nome: string;
  descricao: string;
  data_criacao: Date;
  ativo: boolean;
}

export interface PerfilPermissoesSchema {
  permissao_id: string;
  perfil_id: string;
}
