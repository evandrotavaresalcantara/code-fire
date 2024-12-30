import { CasoDeUso } from "@packages/common";
import { ServidorEmail } from "..";

interface Input {
  de: string;
  para: string;
  assunto: string;
  corpo: string;
  isHtml?: boolean;
  isTest?: boolean;
}

export class EnviarEmail implements CasoDeUso<Input, void> {
  constructor(readonly servidorEmail: ServidorEmail) {}

  async executar(entrada: Input): Promise<void> {
    await this.servidorEmail.enviar(
      entrada.de,
      entrada.para,
      entrada.assunto,
      entrada.corpo,
      entrada.isHtml,
      entrada.isTest
    );
  }
}
