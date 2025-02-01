import { CasoDeUso } from "@packages/common";
import { LogoutDAO } from "../../provider";

interface Input {
  userEmail: string;
  logoutDate: Date;
}

export class RegistrarLogout implements CasoDeUso<Input, void> {
  constructor(private logoutDAO: LogoutDAO) {}

  async executar(entrada: Input): Promise<void> {
    this.logoutDAO.salvar(entrada.userEmail, entrada.logoutDate);
  }
}
