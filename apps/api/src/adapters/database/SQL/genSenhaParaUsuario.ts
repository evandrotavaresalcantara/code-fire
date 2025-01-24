import bcrypt from "bcrypt";

/**
 * Realiza a criptografia para uma senha para ser usado no SQL no INSERT usuario
 *
 * @param {string} password - Colocar a senha desejada
 * @returns {string} - No console será exibido o hash da senha gerada para ser copiado
 *
 * @example
 * npx ts-node apps/api/src/adapters/database/SQL/genSenhaParaUsuario.ts
 */
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}
hashPassword("@Admin1")
  .then((adminPasswordHash) => console.log(adminPasswordHash))
  .catch((e) => console.error(e instanceof Error ? e.message : e));
