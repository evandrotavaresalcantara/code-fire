import ProvedorCriptografia from "../../src/provider/ProvedorCriptografia";

export default class ProvedorCriptografiaMock implements ProvedorCriptografia {
    criptografar(senha: string): string {
        const hash1 = '$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm'
        const hash2 = '$2b$10$yxPNAEZibEGvZ0czM9tYA.UKYDx5dm/w1iNQFi6c2RXo8Pw6bCDES'
        const senha1 = "CodeFire!1"
        const senha2 = "CodeFire!2"
        if (senha === senha1) {
            return hash1
        } else if (senha === senha2) {
            return hash2
        }
        return ''
    }
    comparar(senha: string, senhaCriptografada: string): Boolean {
        const hash1 = '$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm'
        const hash2 = '$2b$10$yxPNAEZibEGvZ0czM9tYA.UKYDx5dm/w1iNQFi6c2RXo8Pw6bCDES'
        const senha1 = "CodeFire!1"
        const senha2 = "CodeFire!2"
        if (senha === senha1 && senhaCriptografada === hash1) {
            return true
        } else if (senha === senha2 && senhaCriptografada === hash2) {
            return true
        }
        return false
    }
}

