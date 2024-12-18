import { Entidade, EntidadeProps, Nome } from "common"

export interface PermissaoProps extends EntidadeProps {
    nome?: string
    descricao?: string
    ativo?: boolean
}

export default class Permissao extends Entidade<Permissao, PermissaoProps> {
    private nome: Nome
    private descricao: Nome
    private dataCriacao: Date
    private _ativo: boolean

    constructor(props: PermissaoProps) {
        super(props)

        this.nome = new Nome({ valor: props.nome, minimo: 3, maximo: 20 })
        this.descricao = new Nome({ valor: props.descricao, minimo: 3, maximo: 50 })
        this._ativo = props.ativo ?? true
        this.dataCriacao = new Date()
    }

    getNomePermissao() {
        return this.nome.nome
    }

    getDescricaoPermissao() {
        return this.descricao.nome
    }

    get ativo(){
        return this._ativo
    }
}