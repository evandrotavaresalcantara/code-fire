export interface ServidorEmail {
  enviar(
    de: string,
    para: string,
    assunto: string,
    corpo: string,
    isHtml?: boolean,
    isTest?: boolean
  ): Promise<void>;
}
