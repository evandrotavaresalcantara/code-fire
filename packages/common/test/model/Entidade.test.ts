import Entidade, { EntidadeProps } from "../../src/model/Entidade"
import  Id  from "../../src/model/Id"

interface EntidadeTesteProps extends EntidadeProps {
    nome?: string
}

class EntidadeTeste extends Entidade<EntidadeTeste, EntidadeTesteProps> {
    readonly nome: string
    constructor(props: EntidadeTesteProps) {
        super(props);
        this.nome = props.nome ?? ''
    }
}

test('Deve calcular igualdade para verdadeiro quando as entidades tem o mesmo id', () => {
    const id1 = Id.novo.valor
    const entidadeTeste1 = new EntidadeTeste({id: id1, nome: "EntidadeTeste1"})
    const entidadeTeste2 = new EntidadeTeste({id: id1, nome: "EntidadeTeste2"})
    expect(entidadeTeste1.igual(entidadeTeste2)).toBeTruthy()
})

test('Deve calcular igualdade para falso quando as entidade tem ids diferentes', () => {
    const entidadeTeste1 = new EntidadeTeste({nome: "EntidadeTeste1"})
    const entidadeTeste2 = new EntidadeTeste({nome: "EntidadeTeste2"})
    expect(entidadeTeste1.diferente(entidadeTeste2)).toBeTruthy()
})

test('Deve clonar uma entidade', ()=> {
    const entidadeTeste1 = new EntidadeTeste({nome: "EntidadeTeste1"})
    const clone = entidadeTeste1.clonar({})

    expect(clone.id.valor).toBe(entidadeTeste1.id.valor)
    expect(clone.props.nome).toBe(entidadeTeste1.props.nome)
})