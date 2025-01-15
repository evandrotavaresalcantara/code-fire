import nodemailer, {
  SendMailOptions,
  SentMessageInfo,
  Transporter,
} from "nodemailer";
import { ServidorEmail } from "../provider";

export class ServidorEmailNodeMailerAdapter implements ServidorEmail {
  private transporter: Transporter;

  constructor(
    host: string,
    port: number,
    secure: boolean,
    user: string,
    pass: string
  ) {
    const auth = { user, pass };
    this.transporter = nodemailer.createTransport({ host, port, secure, auth });
  }

  async enviar(
    de: string,
    para: string,
    assunto: string,
    corpo: string,
    isHtml = false,
    isTest = false
  ) {
    const email: SendMailOptions = isHtml
      ? {
          from: de,
          to: para,
          subject: assunto,
          html: corpo,
        }
      : {
          from: de,
          to: para,
          subject: assunto,
          text: corpo,
        };
    const info: SentMessageInfo = await this.transporter.sendMail(email);
    if (isTest) {
      console.log(
        "\n-> Teste Email Preview URL:",
        nodemailer.getTestMessageUrl(info)
      );
      return info;
    }
  }
}
