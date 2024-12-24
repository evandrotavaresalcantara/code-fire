export interface ServidorEmail {
  enviar(
    de: string,
    para: string,
    assunto: string,
    corpo: string,
    isHtml: boolean
  ): void;
}
