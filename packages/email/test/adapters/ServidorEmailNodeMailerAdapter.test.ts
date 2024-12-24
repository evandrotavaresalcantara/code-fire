import { ServidorEmailNodeMailerAdapter } from "@/adapter";
import { createTestAccount, TestAccount } from "nodemailer";

test.concurrent(
  "Deve enviar email HTML com conta fake",
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
    const info = await servidorEmail.enviar(
      "Teste Usuario <testeusuario@zmail.com>",
      "cliente@email.org",
      "Teste HTML Conta Fake",
      "<h1>Teste de E-mail!</h1><p>Novo parágrafo para teste de quebra linha.</p><p><b>Final</b> do e-mail teste em HTML.</p>",
      true,
      true
    );
    expect(info).toBeDefined();
  },
  12000
);

test.concurrent(
  "Deve enviar email TXT com conta fake",
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
    const info = await servidorEmail.enviar(
      "Teste Usuario <testeusuario@zmail.com>",
      "cliente@email.org",
      "Teste TXT Conta Fake",
      "Teste de E-mail! Final do e-mail teste em TXT.",
      false,
      true
    );
    expect(info).toBeDefined();
  },
  12000
);
