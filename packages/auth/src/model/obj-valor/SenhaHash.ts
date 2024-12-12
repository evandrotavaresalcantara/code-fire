export default class SenhaHash {
    readonly valor: string

    constructor(valor: string) {
        if (!SenhaHash.isValida(valor)) {
            throw new Error('hash inválido.')
        }
        this.valor = valor
    }
    static isValida(senhaHash: string): boolean {
        const regex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/
        return regex.test(senhaHash)
    }
}