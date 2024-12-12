import CasoDeUso from "./CasoDeUso";
import CasoDeUsoComUsuario from "./CasoDeUsoComUsuario";

export default abstract class CasoDeUsoExecutarComo<E, U, S> implements CasoDeUsoComUsuario<E, U, S> {
    executar(entrada: E, Usuario: U): Promise<S> {
        throw new Error("Method not implemented.");
    }

    abstract executarComo(entrada: E, Usuario: U): Promise<S>
    abstract validarPermissao(usuario: U): boolean
}  