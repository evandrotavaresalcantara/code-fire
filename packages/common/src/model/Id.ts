import { validate } from "uuid"
import { v4 as uuid } from "uuid"

export default class Id {
    readonly valor: string

    constructor(id?: string) {
        this.valor = id?.trim() ?? uuid()
        if (!Id.isValido(this.valor)) {
            throw new Error('Id inválido.')
        }
    }

    static get novo(): Id {
        return new Id()
    }

    static isValido(valor: string): boolean {
        return validate(valor)
    }

    igual(id: Id): boolean {
        return this.valor === id.valor
    }

    diferente(id: Id): boolean {
        return this.valor !== id.valor
    }
}