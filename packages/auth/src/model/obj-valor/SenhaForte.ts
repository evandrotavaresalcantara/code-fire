export default class SenhaForte {
    private _valor: string

    constructor(valor?: string) {
        if(!valor) throw new Error('senha inválida.')

        this._valor = valor

        if (!SenhaForte.isValida(this._valor)) {
            throw new Error('senha inválida.')
        }
        
    }
    static isValida(senha: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        return regex.test(senha)
    }

    get valor(){
        return this._valor
    }
}