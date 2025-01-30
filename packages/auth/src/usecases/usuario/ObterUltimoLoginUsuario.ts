import { CasoDeUso } from "@packages/common";
import { LoginDAO } from "../../provider";

interface Input {
  email: string;
}

interface Output {
  userEmail: string;
  loginType: string;
  is2fa: boolean;
  loginDate: Date;
}

export class ObterUltimoLoginUsuario implements CasoDeUso<Input, Output> {
  constructor(private loginDAO: LoginDAO) {}

  async executar(entrada: Input): Promise<Output> {
    const ultimoLogin = await this.loginDAO.obterUltimoPeloEmail(entrada.email);
    if (!ultimoLogin)
      throw new Error("Registro de Login do usuário não encontrado");
    return ultimoLogin;
  }
}
