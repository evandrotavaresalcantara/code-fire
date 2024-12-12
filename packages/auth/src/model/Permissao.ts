import { Entidade, EntidadeProps, Nome } from "common"

export interface PermissaoProps extends EntidadeProps {
    nome?: string
    descricao?: string
    ativo?: boolean
}

export default class Permissao extends Entidade<Permissao, PermissaoProps> {
    readonly nome: Nome
    readonly descricao: Nome
    readonly dataCriacao: Date
    readonly ativo: boolean

    constructor(props: PermissaoProps) {
        super(props)

        this.nome = new Nome({ valor: props.nome, minimo: 3, maximo: 20 })
        this.descricao = new Nome({ valor: props.descricao, minimo: 3, maximo: 50 })
        this.ativo = props.ativo ?? true
        this.dataCriacao = new Date()
    }
}