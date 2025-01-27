import {
  Telefone,
  Email,
  Entidade,
  EntidadeProps,
  NomeComposto,
  Url,
} from "@packages/common";
import { randomUUID } from "crypto";
import SenhaHash from "./obj-valor/SenhaHash";
import Perfil from "./Perfil";

export interface UsuarioProps extends EntidadeProps {
  nomeCompleto?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  urlPerfil?: string;
  ativo?: boolean;
  tokenRecuperacaoSenha?: string;
  dataExpiracaoTokenRecuperacaoSenha?: Date;
  tokenRefreshToken?: string;
  dataExpiracaoTokenRefreshToken?: Date;
  autenticacaoDoisFatores?: boolean;
  dataCriacao?: Date;
  sisAdmin?: boolean;
}

export default class Usuario extends Entidade<Usuario, UsuarioProps> {
  private nomeCompleto: NomeComposto;
  private email: Email;
  private senha: SenhaHash;
  private dataCriacao: Date;
  private telefone: Telefone | null;
  private urlPerfil: Url | null;
  private ativo: boolean;
  private tokenRefreshToken?: string;
  private dataExpiracaoTokenRefreshToken?: Date;
  private tokenRecuperacaoSenha?: string;
  private dataExpiracaoTokenRecuperacaoSenha?: Date;
  private autenticacaoDoisFatores: boolean;
  private perfis: Perfil[];
  private sisAdmin: boolean;

  constructor(props: UsuarioProps) {
    super(props);
    this.nomeCompleto = new NomeComposto({ valor: props.nomeCompleto });
    this.email = new Email(props.email);
    this.senha = new SenhaHash(props.senha);
    this.telefone = props.telefone ? new Telefone(props.telefone) : null;
    this.urlPerfil = props.urlPerfil ? new Url(props.urlPerfil) : null;
    this.dataCriacao = props.dataCriacao
      ? new Date(props.dataCriacao)
      : new Date();
    this.ativo = props.ativo ? true : false;
    this.tokenRefreshToken = props.tokenRefreshToken;
    this.dataExpiracaoTokenRefreshToken = props.dataExpiracaoTokenRefreshToken;
    this.tokenRecuperacaoSenha = props.tokenRecuperacaoSenha;
    this.dataExpiracaoTokenRecuperacaoSenha =
      props.dataExpiracaoTokenRecuperacaoSenha;
    this.autenticacaoDoisFatores = props.autenticacaoDoisFatores
      ? props.autenticacaoDoisFatores
      : false;
    this.perfis = [];
    this.sisAdmin = props.sisAdmin ? true : false;
  }

  getNome() {
    return this.nomeCompleto.nome;
  }
  getUrlPerfil() {
    return this.urlPerfil?.valor;
  }

  getSenha() {
    return this.senha.valor;
  }

  getEmail() {
    return this.email.valor;
  }

  getTelefone() {
    return this.telefone?.semMascara;
  }

  getAutenticacaoDoisFatores() {
    return this.autenticacaoDoisFatores;
  }

  getSisAdmin() {
    return this.sisAdmin;
  }
  get obterPerfis(): Perfil[] {
    return this.perfis;
  }

  get qtdPerfils(): number {
    return this.perfis.length;
  }

  get habilitado() {
    return this.ativo;
  }

  get existePerfil(): boolean {
    const qtdPerfils = this.qtdPerfils;
    return qtdPerfils > 0 ? true : false;
  }

  adiconarPerfil(perfil: Perfil) {
    if (!this.existePerfil) {
      this.perfis.push(perfil);
    } else {
      const isExiste = this.perfis.find(
        (p) => p.getUuid() === perfil.getUuid(),
      );
      if (!isExiste) {
        this.perfis.push(perfil);
      }
    }
  }

  removerPerfil(perfil: Perfil) {
    if (this.existePerfil) {
      const isExiste = this.perfis.find(
        (p) => p.getUuid() === perfil.getUuid(),
      );
      if (isExiste) {
        this.perfis = this.perfis.filter(
          (p) => p.getUuid() !== perfil.getUuid(),
        );
      }
    }
  }

  limparPerfis() {
    this.perfis = [];
  }

  setTokenReFreshToken(refreshToken: string, login = false) {
    this.tokenRefreshToken = refreshToken.trim();
    if (login) {
      const hoje = new Date();
      this.dataExpiracaoTokenRefreshToken = new Date(
        hoje.getTime() + 30 * 24 * 60 * 60 * 1000,
      );
    }
  }

  getTokenReFreshToken() {
    return this.tokenRefreshToken?.trim();
  }

  getDataExpiracaoTokenFreshToken() {
    return this.dataExpiracaoTokenRefreshToken;
  }

  getTokenRecuperacaoSenha() {
    return this.tokenRecuperacaoSenha;
  }

  getDataExpiracaoRecuperacaoSenha() {
    return this.dataExpiracaoTokenRecuperacaoSenha;
  }

  setRecuperacaoSenha(): string {
    if (
      !this.tokenRecuperacaoSenha &&
      !this.dataExpiracaoTokenRecuperacaoSenha
    ) {
      this.genRecuperacaoSenha();
    } else if (this.dataExpiracaoTokenRecuperacaoSenha) {
      if (
        this.dataExpiracaoTokenRecuperacaoSenha.getTime() < new Date().getTime()
      ) {
        this.genRecuperacaoSenha();
      }
    }
    if (!this.tokenRecuperacaoSenha) {
      this.genRecuperacaoSenha();
    }
    return this.tokenRecuperacaoSenha as string;
  }

  private genRecuperacaoSenha() {
    const hoje = new Date();
    this.tokenRecuperacaoSenha = randomUUID();
    this.dataExpiracaoTokenRecuperacaoSenha = new Date(
      hoje.getTime() + 60 * 60 * 1000,
    );
  }

  cleanRecuperacaoSenha() {
    this.tokenRecuperacaoSenha = undefined;
    this.dataExpiracaoTokenRecuperacaoSenha = undefined;
  }

  limparRefreshToken() {
    this.tokenRefreshToken = undefined;
    this.dataExpiracaoTokenRefreshToken = undefined;
  }

  getDataCriacao() {
    return this.dataCriacao;
  }
}
