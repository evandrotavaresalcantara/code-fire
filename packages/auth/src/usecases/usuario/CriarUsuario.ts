import { CasoDeUso, Celular, Email, NomeComposto } from "@packages/common";
import { Usuario } from "../../model";
import SenhaForte from "../../model/obj-valor/SenhaForte";
import { ProvedorCriptografia, RepositorioUsuario } from "../../provider";

interface Entrada {
  nomeCompleto?: string;
  email?: string;
  senha?: string;
  senhaConfirmacao?: string;
  celular?: string;
  ativo: boolean;
}

export default class CriarUsuario implements CasoDeUso<Entrada, void> {
  constructor(
    private repo: RepositorioUsuario,
    private provedorCriptografia: ProvedorCriptografia,
  ) {}

  async executar(entrada: Entrada): Promise<void> {
    if (entrada.senha !== entrada.senhaConfirmacao) {
      throw new Error("Senhas diferentes.");
    }
    const nomeCompleto = new NomeComposto({ valor: entrada.nomeCompleto });
    const email = new Email(entrada.email);
    const senha = new SenhaForte(entrada.senha);
    const celular = new Celular(entrada.celular);
    const hashSenha = this.provedorCriptografia.criptografar(senha.valor);
    const usuarioExiste = await this.repo.obterPorEmail(email.valor);
    if (usuarioExiste) throw new Error("Usuário já existe.");
    const usuario: Usuario = new Usuario({
      nomeCompleto: nomeCompleto.nome,
      email: email.valor,
      senha: hashSenha,
      celular: celular.semMascara,
      ativo: entrada.ativo,
    });
    await this.repo.criarUsuario(usuario);
  }
}
