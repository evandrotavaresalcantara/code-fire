export default class Telefone {
  private numero: string;
  private celular: boolean;

  constructor(valor?: string) {
    if (!valor) {
      throw new Error("Dados Inválidos: número de telefone não preenchido.");
    }

    this.numero = valor.replace(/[.()\-\s]/g, "");

    if (!Telefone.isValido(this.numero)) {
      throw new Error("Dados Inválidos: número do telefone inválido.");
    }

    this.celular = this.numero.slice(2, 3) === "9";
  }

  static isValido(valor: string): boolean {
    const regex = /^[1-9]{2}(?:9[0-9]{8}|[2-5][0-9]{7})$/;
    return regex.test(valor);
  }

  get isCelular(): boolean {
    return this.celular;
  }

  get comMascara(): string {
    return this.gerarMascara(this.numero);
  }

  get semMascara(): string {
    return this.numero;
  }

  private gerarMascara(telefone: string) {
    return this.isCelular
      ? this.gerarMascaraTelefone(telefone)
      : this.gerarMascaraFixo(telefone);
  }

  private gerarMascaraFixo(telefone: string) {
    const ddd = telefone.slice(0, 2);
    const primeiraParte = telefone.slice(2, 6);
    const segundaParte = telefone.slice(6);

    return `(${ddd}) ${primeiraParte}-${segundaParte}`;
  }

  private gerarMascaraTelefone(telefone: string) {
    const ddd = telefone.slice(0, 2);
    const primeiroDigito = telefone.slice(2, 3);
    const primeiraParte = telefone.slice(3, 7);
    const segundaParte = telefone.slice(7);

    return `(${ddd}) ${primeiroDigito} ${primeiraParte}-${segundaParte}`;
  }
}
