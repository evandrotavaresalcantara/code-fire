import Nome, { NomeProps } from "./Nome";

export interface NomeCompostoProps extends NomeProps {
}

export default class NomeComposto extends Nome {
    private existeSobrenome: boolean

    constructor(props: NomeCompostoProps) {
        if (!props.valor) {
            throw new Error('valor inválido.')
        }

        super(props)

        if (!/^[a-zA-ZÀ-ú'\.-\s]*$/.test(props.valor)) {
            throw new Error('contém caracteres inválidos.')
        }

        if (props.valor.split(" ").length < 2) {
            this.existeSobrenome = false
        } else {
            this.existeSobrenome = true
        }
    }

    get existeSobrome():boolean{
        return this.existeSobrenome
    }
    get primeiroNome() {
        return this.valor.split(" ")[0]
    }

    get sobrenomes(): string[] {
        if(this.existeSobrenome){
            return this.valor.split(" ").slice(1)
        }else{
            return []
        }
    }

    get ultimoSobrenome(): string {
        return this.valor.split(" ").pop() as string
    }

    get iniciais(): string {
        return this.primeiroNome[0] + this.ultimoSobrenome[0]
    }
}