export default class Email {
  private endereco: string;

  constructor(valor?: string) {
    if (!valor) {
      throw new Error("e-mail inválido.");
    }

    if (!Email.isValido(valor)) {
      throw new Error("e-mail inválido.");
    }
    this.endereco = valor;
  }
  get nome(): string {
    return this.endereco.split("@")[0]!;
  }

  get valor(): string {
    return this.endereco;
  }

  static isValido(valor: string): boolean {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return regex.test(valor);
  }
}
