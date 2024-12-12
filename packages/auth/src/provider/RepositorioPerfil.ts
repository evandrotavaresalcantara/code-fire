import { Id } from "common";
import Perfil from "../model/Perfil";

export default interface RepositorioPerfil {
    obterPerfis(): Promise<Perfil[]>
    obterPerfilPorId(id: Id): Promise<Perfil | null>
    criarPerfil(perfil: Perfil): Promise<void>
    editarPerfil(perfil: Perfil): Promise<void>
    excluirPerfil(id: Id): Promise<void>
}