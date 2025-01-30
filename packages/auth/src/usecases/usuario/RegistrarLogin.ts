import { CasoDeUso } from "@packages/common";
import { LoginDAO } from "../../provider";

interface Input {
  userEmail: string;
  loginType: string;
  is2fa: boolean;
  loginDate: Date;
}

export class RegistrarLogin implements CasoDeUso<Input, void> {
  constructor(private loginDAO: LoginDAO) {}

  async executar(entrada: Input): Promise<void> {
    this.loginDAO.salvar(
      entrada.userEmail,
      entrada.loginType,
      entrada.is2fa,
      entrada.loginDate,
    );
  }
}
