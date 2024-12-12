export default class SenhaForte {
    readonly valor: string
    constructor(valor: string) {
        if (!SenhaForte.isValida(valor)) {
            throw new Error('senha fraca.')
        }
        this.valor = valor
    }
    static isValida(senha: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        return regex.test(senha)
    }
}