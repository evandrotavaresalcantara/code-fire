import { Celular, Email, Entidade, EntidadeProps, NomeComposto, Url } from "common";
import SenhaHash from "./obj-valor/SenhaHash";
import Perfil from "./Perfil";

export interface UsuarioProps extends EntidadeProps {
    nomeCompleto?: string
    email?: string
    senha?: string
    celular?: string
    urlPerfil?: string
    ativo?: boolean
    dataExpiracaoToken?: Date | null
    tokenRecuperacaoSenha?: string | null
    autenticaçãoDoisFatores?: boolean
}

export default class Usuario extends Entidade<Usuario, UsuarioProps> {
    readonly nomeCompleto: NomeComposto
    readonly email: Email
    readonly senha: SenhaHash | null
    readonly dataCriacao: Date
    readonly celular: Celular | null
    readonly urlPerfil: Url | null
    readonly ativo: boolean
    readonly tokenRecuperacaoSenha: string
    readonly dataExpiracaoToken: Date | null
    readonly autenticaçãoDoisFatores: boolean
    private perfis: Perfil[]

    constructor(props: UsuarioProps) {
        super(props)
        this.nomeCompleto = new NomeComposto({ valor: props.nomeCompleto })
        this.email = new Email(props.email)
        this.senha = props.senha ? new SenhaHash(props.senha) : null
        this.celular = props.celular ? new Celular(props.celular) : null
        this.urlPerfil = props.celular ? new Url(props.urlPerfil) : null
        this.dataCriacao = new Date()
        this.ativo = props.ativo ? props.ativo : true
        this.tokenRecuperacaoSenha = props.tokenRecuperacaoSenha ?? ""
        this.dataExpiracaoToken = props.dataExpiracaoToken ? props.dataExpiracaoToken : null
        this.autenticaçãoDoisFatores = props.autenticaçãoDoisFatores ? props.autenticaçãoDoisFatores : false
        this.perfis = []
    }

    get obterPerfis(): Perfil[] {
        return this.perfis
    }

    get qtdPerfils(): number {
        return this.perfis.length
    }

    get existePerfil(): boolean {
        const qtdPerfils = this.qtdPerfils
        return qtdPerfils > 0 ? true : false
    }

    adiconarPerfil(perfil: Perfil) {
        if (!this.existePerfil) {
            this.perfis.push(perfil)
        } else {
            const isExiste = this.perfis.find(p => p.id.valor === perfil.id.valor)
            if (!isExiste) {
                this.perfis.push(perfil)
            }
        }
    }

    removerPerfil(perfil: Perfil) {
        if (this.existePerfil) {
            const isExiste = this.perfis.find(p => p.id.valor === perfil.id.valor)
            if (isExiste) {
                this.perfis = this.perfis.filter(p => p.id.valor !== perfil.id.valor)
            }
        }
    }

    semSenha(): Usuario {
        return this.clonar({ senha: undefined })
    }
}