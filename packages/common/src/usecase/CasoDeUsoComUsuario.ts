export default interface CasoDeUsoComUsuario<E,U, S>{
    executar(entrada: E, Usuario: U, ):Promise<S>
}