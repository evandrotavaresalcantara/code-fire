import { CasoDeUso } from "common";
import { RepositorioUsuario } from "../../provider";

interface UsuarioDTO {
    id?: string,
    nomeCompleto?: string
    email?: string
    celular?: string
    urlPerfil?: string
    ativo?: boolean
}

export default class ObterUsuarios implements CasoDeUso<void, UsuarioDTO[]> {
    constructor(private repo: RepositorioUsuario) { }

    async executar(): Promise<UsuarioDTO[]> {
        const usuariosBD = await this.repo.obterUsuarios()

        return usuariosBD.map((u) => ({
            id: u.getUuid(),
            nomeCompleto: u.getNome(),
            email: u.getEmail(),
            celular: u.getCelular(),
            urlPerfil: u.getUrlPerfil(),
            ativo: u.habilitado,
        }))
    }
}