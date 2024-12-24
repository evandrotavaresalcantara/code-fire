import { ServidorEmailNodeMailerAdapter } from "@/adapter";
import { EnviarEmail } from "@/usecases";
import { createTestAccount, TestAccount } from "nodemailer";

test.concurrent(
  "Deve enviar e-mail html",
  async () => {
    const account: TestAccount = await new Promise((resolve, reject) => {
      createTestAccount((error, account) => {
        if (error) {
          return reject(
            new Error("Falha ao criar uma conta de teste: " + error)
          );
        }
        resolve(account);
      });
    });
    const servidorEmail = new ServidorEmailNodeMailerAdapter(
      account.smtp.host,
      account.smtp.port,
      account.smtp.secure,
      account.user,
      account.pass
    );
    const enviarEmail = new EnviarEmail(servidorEmail);
    const input = {
      de: "Teste Usuario <testeusuario@zmail.com>",
      para: "cliente@email.org",
      assunto: "Teste HTML Conta Fake",
      corpo:
        "<h1>Teste de E-mail no Caso de Uso!</h1><p>Novo parágrafo para teste de quebra linha.</p><p><b>Final</b> do e-mail teste em HTML.</p>",
      isHtml: true,
      isTest: true,
    };
    expect(await enviarEmail.executar(input)).toBeUndefined();
  },
  12000
);
