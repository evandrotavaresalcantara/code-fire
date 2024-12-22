import { Entidade, EntidadeProps, Nome } from "common";
import Permissao from "./Permissao";

export interface PerfilProps extends EntidadeProps {
<<<<<<< HEAD
  nome?: string;
  descricao?: string;
  ativo?: boolean;
  dataCriacao?: Date;
}

export default class Perfil extends Entidade<Perfil, PerfilProps> {
  private nome: Nome;
  private descricao: Nome;
  private ativo: boolean;
  private dataCriacao: Date;
  private permissoes: Permissao[];

  constructor(props: PerfilProps) {
    super(props);
    this.nome = new Nome({ valor: props.nome, minimo: 3, maximo: 20 });
    this.descricao = new Nome({
      valor: props.descricao,
      minimo: 3,
      maximo: 50,
    });
    this.permissoes = [];
    this.ativo = props.ativo ? props.ativo : true;
    this.dataCriacao = props.dataCriacao
      ? new Date(props.dataCriacao)
      : new Date();
  }
=======
    nome?: string
    descricao?: string
    ativo?: boolean
    dataCriacao?: Date
}

export default class Perfil extends Entidade<Perfil, PerfilProps> {
    private nome: Nome
    private descricao: Nome
    private _ativo: boolean
    private dataCriacao: Date
    private permissoes: Permissao[]

    constructor(props: PerfilProps) {
        super(props)
        this.nome = new Nome({ valor: props.nome, minimo: 3, maximo: 20 })
        this.descricao = new Nome({ valor: props.descricao, minimo: 3, maximo: 50 })
        this.permissoes = []
        this._ativo = props.ativo ? props.ativo : true
        this.dataCriacao = new Date()
    }

    get ativo(): boolean {
        return this._ativo
    }
>>>>>>> 68943cb8d146d82f03f3dd3dfdd971b0f7203a75

  get obterPermissoes(): Permissao[] {
    return this.permissoes;
  }

  get qtdPermissoes(): number {
    return this.permissoes.length;
  }

  get existePermissao(): boolean {
    const permissoesQtd = this.qtdPermissoes;
    return permissoesQtd > 0 ? true : false;
  }

<<<<<<< HEAD
  getativo() {
    return this.ativo;
  }
=======
    getNomePerfil() {
        return this.nome.nome
    }

    getDataCriacao() {
        return this.dataCriacao
    }

    getDescricaoPerfil() {
        return this.descricao.nome
    }
>>>>>>> 68943cb8d146d82f03f3dd3dfdd971b0f7203a75

  getNomePerfil() {
    return this.nome.nome;
  }
  getDescricaoPerfil() {
    return this.descricao.nome;
  }

  getDataCriacao() {
    return this.dataCriacao;
  }

  adicionarPermissao(permissao: Permissao) {
    if (!this.existePermissao) {
      this.permissoes.push(permissao);
    } else {
      const isExiste = this.permissoes.find(
        (p) => p.getUuid() === permissao.getUuid(),
      );
      if (!isExiste) {
        this.permissoes.push(permissao);
      }
    }
  }

  removerPermissao(permisao: Permissao) {
    if (this.existePermissao) {
      const isExiste = this.permissoes.find(
        (p) => p.getUuid() === permisao.getUuid(),
      );
      if (isExiste) {
        this.permissoes = this.permissoes.filter(
          (p) => p.getUuid() !== permisao.getUuid(),
        );
      }
    }
  }
}
