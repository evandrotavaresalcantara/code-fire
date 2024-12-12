import  Id from "./Id";

export interface EntidadeProps {
    id? :string
}

export default abstract class Entidade<Tipo, Props extends EntidadeProps >{
    readonly id: Id
    readonly props: Props

    constructor(props: Props ){
        this.id = new Id(props.id)
        this.props = {...props, id: this.id.valor }
    }

    igual(entidade:Entidade<Tipo, Props> ): boolean{
        return this.id.igual(entidade.id)
    }

    diferente(entidade: Entidade<Tipo, Props>): boolean{
        return this.id.diferente(entidade.id)
    }

    clonar(novasProps: Props): Tipo{
        const propsClonada = {...this.props, ...novasProps }
        return new(this.constructor as {new(props: Props):Tipo})(propsClonada)
    }
}

