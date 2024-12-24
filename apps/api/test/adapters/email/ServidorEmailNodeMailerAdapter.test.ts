import { ServidorEmailNodeMailerAdapter } from "@/adapters";
import { ENV } from "@/config";
import { createTestAccount, TestAccount } from "nodemailer";

test.skip("Deve enviar um email txt sem html", () => {
  const EMAIL_HOST = ENV.EMAIL_HOST || "";
  const EMAIL_PORT = parseInt(ENV.EMAIL_HOST_PORT) || 0;
  const EMAIL_SECURE = ENV.EMAIL_HOST_SECURE_SSL;
  const EMAIL_USER = ENV.EMAIL_HOST_USER || "";
  const EMAIL_PASS = ENV.EMAIL_HOST_PASSWORD || "";
  const servidorEmail = new ServidorEmailNodeMailerAdapter(
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_USER,
    EMAIL_PASS,
  );
  expect(
    servidorEmail.enviar(
      "Teste Usuario <testeusuario@zmail.com>",
      "seuemail@meudominio.com.br",
      "Teste Real de Envio",
      "Teste de envio pelo nodemailer para um e-mail real.",
      false,
    ),
  ).toBeUndefined();
});

test.concurrent(
  "Deve enviar email HTML com conta fake",
  async () => {
    const account: TestAccount = await new Promise((resolve, reject) => {
      createTestAccount((error, account) => {
        if (error) {
          return reject(
            new Error("Falha ao criar uma conta de teste: " + error),
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
      account.pass,
    );
    const info = await servidorEmail.enviar(
      "Teste Usuario <testeusuario@zmail.com>",
      "cliente@email.org",
      "Teste HTML Conta Fake",
      "<h1>Teste de E-mail!</h1><p>Novo parágrafo para teste de quebra linha.</p><p><b>Final</b> do e-mail teste em HTML.</p>",
      true,
      true,
    );
    expect(info).toBeDefined();
  },
  12000,
);

test.concurrent(
  "Deve enviar email TXT com conta fake",
  async () => {
    const account: TestAccount = await new Promise((resolve, reject) => {
      createTestAccount((error, account) => {
        if (error) {
          return reject(
            new Error("Falha ao criar uma conta de teste: " + error),
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
      account.pass,
    );
    const info = await servidorEmail.enviar(
      "Teste Usuario <testeusuario@zmail.com>",
      "cliente@email.org",
      "Teste TXT Conta Fake",
      "Teste de E-mail! Final do e-mail teste em TXT.",
      false,
      true,
    );
    expect(info).toBeDefined();
  },
  12000,
);
