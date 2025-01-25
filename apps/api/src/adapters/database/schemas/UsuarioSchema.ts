import { EntidadeSchema } from "./EntidadeSchema";

export interface UsuarioSchema extends EntidadeSchema {
  nome: string;
  email: string;
  senha: string;
  data_criacao: Date;
  ativo: boolean;
  refresh_token: string;
  data_expiracao_refresh_token: Date;
  recuperar_senha_token: string;
  data_expiraca_recuperar_senha_token: Date;
  dois_fatores: boolean;
  telefone: string;
  imagem_perfil: string;
}

export interface UsuarioPerfilsSchema {
  usuario_id: string;
  perfil_id: string;
}

export interface OtpSchema {
  email: string;
  codigo: string;
  expira_em: Date;
}
