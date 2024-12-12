export default class Url {
    private url: URL

    constructor(valor?: string) {
        if (!valor) {
            throw new Error('url inválida.')
        }

        if (!Url.isValida(valor)) {
            throw new Error('url inválida.')
        }
        this.url = new URL(valor)
    }

    get valor(){
        return this.url.href
    }

    get dominio(){
        return this.url.hostname
    }

    static isValida(url: string): boolean {
        try {
            new URL(url)
            return true
        } catch (error) {
            return false
        }
    }
}