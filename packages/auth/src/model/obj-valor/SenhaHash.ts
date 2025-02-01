export default class SenhaHash {
  private _valor: string;

  constructor(valor?: string) {
    if (!valor) throw new Error("hash inválido.");

    this._valor = valor;

    if (!SenhaHash.isValida(valor)) {
      throw new Error("hash inválido.");
    }
  }
  static isValida(senhaHash: string): boolean {
    const regex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/;
    return regex.test(senhaHash);
  }

  get valor() {
    return this._valor;
  }
}
