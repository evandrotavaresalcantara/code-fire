export default interface ProvedorToken {
    gerarToken(payload: string | object): string
    validarToken(token: string): string | object
}