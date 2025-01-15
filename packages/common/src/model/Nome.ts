export interface NomeProps {
  valor?: string;
  minimo?: number;
  maximo?: number;
}
export default class Nome {
  private valor: string;
  private minimo: number;
  private maximo: number;

  constructor(props: NomeProps) {
    if (!props.valor) {
      throw new Error("valor inválido.");
    }

    this.minimo = props.minimo ?? 3;
    this.maximo = props.maximo ?? 100;

    this.valor = props.valor.trim();

    if (props.valor.length < this.minimo) {
      throw new Error(`deve ter no mínimo ${this.minimo} caracteres.`);
    }

    if (props.valor.length > this.maximo) {
      throw new Error(`deve ter no máximo ${this.maximo} caracteres.`);
    }
  }
  get nome() {
    return this.valor;
  }
}
