import { CasoDeUso } from "common";
import { RepositorioUsuario } from "../../provider";

type IdUsuario = string
export default class RemoverUsuario implements CasoDeUso<IdUsuario, void> {
    constructor(private repo: RepositorioUsuario) {}

    async executar(idUsuario: string): Promise<void> {
        await this.repo.excluirUsuario(idUsuario)
    }

}