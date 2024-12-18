export default class Celular {
    private numero: string;

    constructor(valor?: string) {
        if(!valor){
            throw new Error('número de celular inválido.')
        }

        this.numero = valor.replace(/\D/g, "")

        if (!Celular.isValido(this.numero)) {
            throw new Error('número de celular inválido.')
        }
    }

    static isValido(valor: string): boolean {
        const regex = /^[1-9]{2}9[0-9]{8}$/
        return regex.test(valor);
    }

    get comMascara(): string {
        const ddd = this.numero.slice(0, 2);
        const primeiroDigito = this.numero.slice(2, 3);
        const primeiraParte = this.numero.slice(3, 7);
        const segundaParte = this.numero.slice(7);
        return `(${ddd}) ${primeiroDigito} ${primeiraParte}-${segundaParte}`;
    }

    get semMascara(): string {
        return this.numero;
    }
}
