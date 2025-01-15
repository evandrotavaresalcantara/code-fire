// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Formatter {
  public static getDigits(str?: string, maxLength?: number) {
    if (!str) return "";
    return str.replace(/\D/g, "").slice(0, maxLength);
  }

  public static getFullDigits(str?: string) {
    if (!str) return "";
    return str.replace(/\D/g, "");
  }

  public static moneyNumberToDisplay(num: number) {
    return num.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  public static moneyNumberToDisplayCurrencyBRL(num: number) {
    return num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  public static moneyStringToStore(num?: string) {
    if (!num) return 0;
    num = num.trim();

    // const factor1 = num.includes(",") ? 1 : 100
    const factor = num.includes(",") ? 1 : 1;
    const unmasked =
      parseFloat(num.replace(/\./g, "").replace(/,/g, ".")) / factor;
    const decimalPlaces = num.split(",")[1]?.length ?? 0;

    // if (decimalPlaces === 1) return unmasked * 10
    if (decimalPlaces >= 3) return Number(unmasked.toFixed(2));
    return unmasked;
  }

  public static formatCNPJToDisplay(cnpj: string) {
    const onlyDigits = Formatter.getDigits(cnpj, 14);

    const length = onlyDigits.length;
    if (length === 11) {
      // Aplica mascara para CPF
      // if (length < 3) return onlyDigits
      // let str = `${onlyDigits.slice(0, 3)}.${onlyDigits.slice(3, 6)}`
      // if (length < 7) return str
      // str += `.${onlyDigits.slice(6, 9)}`
      // if (length < 10) return str
      // return `${str}-${onlyDigits.slice(9)}`
      return onlyDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      // Aplica mascara para CNPJ
      if (length < 3) return onlyDigits;

      let str = `${onlyDigits.slice(0, 2)}.${onlyDigits.slice(2, 5)}`;
      if (length < 6) return str;

      str += `.${onlyDigits.slice(5, 8)}`;
      if (length < 9) return str;

      str += `/${onlyDigits.slice(8, 12)}`;
      if (length < 13) return str;

      return `${str}-${onlyDigits.slice(12)}`;
    }
  }

  public static removeAccents(texto?: string): string {
    if (!texto) return "";
    texto = texto.trim().replace(/\s{2,}/g, " ");

    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  public static textToSlugUpper(text?: string): string {
    return Formatter.removeAccents(text)
      .toUpperCase()
      .replace(/\n/g, " ")
      .replace("&", "E");
  }

  public static textToSlugLower(text?: string): string {
    return Formatter.removeAccents(text)
      .toLowerCase()
      .replace(/\n/g, " ")
      .replace("&", "E")
      .replace(/\s/g, "_");
  }

  public static capitalizeFirstLetter(str?: string): string {
    str = str?.trim() ?? "";
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public static maskCurrency(
    value: string | number | null | undefined
  ): string {
    value = Formatter.cleanNumberInString(value);
    if (value === "") return value;

    // Adiciona zeros à esquerda se necessário para garantir pelo menos três dígitos
    if (value.length === 1) {
      // Value = "00" + value;
      value = value.padStart(3, "0");
    } else if (value.length === 2) {
      value = "0" + value;
    } else {
      // Value = value.replace(/0/, "");
      // Remove zero inicial se presente
      value = value.replace(/^0(0)?/, "");
    }

    // Formata o valor para incluir duas casas decimais
    const integerPart = value.slice(0, -2);
    const decimalPart = value.slice(-2);

    // Adiciona os pontos de milhar
    const integerPartWithThousandSeparator = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );

    // Retorna o valor formatado com vírgula como separador decimal
    return `${integerPartWithThousandSeparator},${decimalPart}`;
  }

  private static cleanNumberInString(
    value: string | number | null | undefined
  ): string {
    if (!value) return "";

    if (typeof value === "number") value = value.toString();
    // Remove todos os caracteres que não sejam números
    return value.replace(/\D/g, "");
  }

  public static maskCep(value: string | number | null | undefined): string {
    value = Formatter.cleanNumberInString(value);
    return value.replace(/^(\d{5})(\d)/g, "$1-$2");
  }

  public static maskDate(value: string | number | null | undefined): string {
    value = Formatter.cleanNumberInString(value);
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    return value.replace(/(\d{2})(\d)/, "$1/$2");
  }

  public static maskTelephone(
    value: string | number | null | undefined
  ): string {
    value = Formatter.cleanNumberInString(value);
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    return value.replace(/(\d)(\d{4})$/, "$1-$2");
  }

  public static formatDate(date: Date) {
    const padToTwoDigits = (number: number) =>
      number < 10 ? `0${number}` : number;

    const year = date.getFullYear();
    const month = padToTwoDigits(date.getMonth() + 1); // Meses começam em 0
    const day = padToTwoDigits(date.getDate());
    const hours = padToTwoDigits(date.getHours());
    const minutes = padToTwoDigits(date.getMinutes());
    const seconds = padToTwoDigits(date.getSeconds());
    const milliseconds = date.getMilliseconds().toString().padEnd(6, "0"); // Garante 6 dígitos

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}
