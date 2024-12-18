export default interface ProvedorCriptografia {
    criptografar(senha: string): string
    comparar(senha: string, senhaCriptografada: string): Boolean
}