export interface AuthToken {
  verify(token?: string): boolean;
  create(payload: string | Buffer | object, expires: string | number): string;
  decode<PayloadInterface>(token: string): PayloadInterface | null;
}
