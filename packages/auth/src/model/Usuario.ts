import {
  Celular,
  Email,
  Entidade,
  EntidadeProps,
  NomeComposto,
  Url,
} from "common";
import SenhaHash from "./obj-valor/SenhaHash";
import Perfil from "./Perfil";

export interface UsuarioProps extends EntidadeProps {
  nomeCompleto?: string;
  email?: string;
  senha?: string;
  celular?: string;
  urlPerfil?: string;
  ativo?: boolean;
  dataExpiracaoToken?: Date | null;
  tokenRecuperacaoSenha?: string | null;
  autenticaçãoDoisFatores?: boolean;
  dataCriacao?: Date;
}

export default class Usuario extends Entidade<Usuario, UsuarioProps> {
  private nomeCompleto: NomeComposto;
  private email: Email;
  private senha: SenhaHash | null;
  private dataCriacao: Date;
  private celular: Celular | null;
  private urlPerfil: Url | null;
  private ativo: boolean;
  private tokenRecuperacaoSenha: string;
  private dataExpiracaoToken: Date | null;
  private autenticaçãoDoisFatores: boolean;
  private perfis: Perfil[];

  constructor(props: UsuarioProps) {
    super(props);
    this.nomeCompleto = new NomeComposto({ valor: props.nomeCompleto });
    this.email = new Email(props.email);
    this.senha = props.senha ? new SenhaHash(props.senha) : null;
    this.celular = props.celular ? new Celular(props.celular) : null;
    this.urlPerfil = props.urlPerfil ? new Url(props.urlPerfil) : null;
    this.dataCriacao = props.dataCriacao
      ? new Date(props.dataCriacao)
      : new Date();
    this.ativo = props.ativo ?? true;
    this.tokenRecuperacaoSenha = props.tokenRecuperacaoSenha ?? "";
    this.dataExpiracaoToken = props.dataExpiracaoToken
      ? props.dataExpiracaoToken
      : null;
    this.autenticaçãoDoisFatores = props.autenticaçãoDoisFatores
      ? props.autenticaçãoDoisFatores
      : false;
    this.perfis = [];
  }

  getNome() {
    return this.nomeCompleto.nome;
  }
  getUrlPerfil() {
    return this.urlPerfil?.valor;
  }

  getSenha() {
    return this.senha?.valor ? this.senha.valor : null;
  }

  getEmail() {
    return this.email.valor;
  }

  getCelular() {
    return this.celular?.semMascara;
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

  semSenha(): Usuario {
    return this.clonar({ senha: undefined });
  }

  setTokenRecuperacaoSenha(refreshToken: string, login = false) {
    this.tokenRecuperacaoSenha = refreshToken;
    if (login) {
      const hoje = new Date();
      this.dataExpiracaoToken = new Date(
        hoje.getTime() + 30 * 24 * 60 * 60 * 1000,
      );
    }
  }

  getTokenRecuperacaoSenha() {
    return this.tokenRecuperacaoSenha;
  }

  getDataExpiracaoToken() {
    return this.dataExpiracaoToken;
  }

  getDataCriacao() {
    return this.dataCriacao;
  }
}
