export default class ValidarEntrada {

    static validarObjeto(obj: Record<string, any>, propriedades: string[]): void {

        for (const propriedade of propriedades) {
            if (!(propriedade in obj)) {
                throw new Error(`A propriedade '${propriedade}' é obrigatória.`);
            }
        }

        for (const [key, value] of Object.entries(obj)) {
            if (value === null || value === undefined) {
                throw new Error(`O campo ${key} não pode ser vazio`)
            }
        }
    }
}