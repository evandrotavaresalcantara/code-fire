import { CasoDeUso, Email } from "@packages/common";
import { Usuario } from "../../model";
import SenhaForte from "../../model/obj-valor/SenhaForte";
import { ProvedorCriptografia, RepositorioUsuario } from "../../provider";

interface Entrada {
  nomeCompleto?: string;
  email?: string;
  senha?: string;
  senhaConfirmacao?: string;
  telefone?: string;
  ativo: boolean;
  urlPerfil?: string;
}

export default class RegistrarUsuario implements CasoDeUso<Entrada, void> {
  constructor(
    private repo: RepositorioUsuario,
    private provedorCriptografia: ProvedorCriptografia,
  ) {}

  async executar(entrada: Entrada): Promise<void> {
    if (entrada.senha !== entrada.senhaConfirmacao) {
      throw new Error("Senhas diferentes.");
    }
    const senha = new SenhaForte(entrada.senha);
    const hashSenha = this.provedorCriptografia.criptografar(senha.valor);
    const email = new Email(entrada.email);
    const usuarioExiste = await this.repo.obterPorEmail(email.valor);
    if (usuarioExiste) throw new Error("Usuário já existe.");
    const usuario: Usuario = new Usuario({
      nomeCompleto: entrada.nomeCompleto,
      email: entrada.email,
      senha: hashSenha,
      telefone: entrada.telefone,
      ativo: entrada.ativo,
      urlPerfil: entrada.urlPerfil,
    });
    await this.repo.criarUsuario(usuario);
  }
}
