export interface AuthToken {
  verify(token?: string): boolean;
  create(payload: string | Buffer | object, expires: string | number): string;
  decode(token: string): string | object | null;
}
