import { CasoDeUso } from "common";
import { RepositorioUsuario } from "../../provider";

type IdUsuario = string

export default class HabilitarUsuario implements CasoDeUso<IdUsuario, void>{
    constructor(private repo: RepositorioUsuario){}
    
    async executar(idUsuario: IdUsuario): Promise<void> {
        const usuarioExiste = await this.repo.obterUsuarioPorId(idUsuario)
        if(!usuarioExiste)  throw new Error('usuário não existe.')
        const usuarioHabilitado = usuarioExiste.clonar({ativo: true})
        await this.repo.editarUsuario(usuarioHabilitado)
    }
}