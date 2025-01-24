import { Errors } from "../../constants";

export class Email {
  private static readonly REGEX =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  readonly value: string;

  public constructor(email?: string) {
    this.value = email?.trim().toLowerCase() ?? "";

    if (!Email.isValid(this.value)) throw new Error(Errors.EMAIL_INVALIDO);
  }

  public get user(): string {
    return this.value.split("@")[0];
  }
  public get domain(): string {
    return this.value.split("@")[1];
  }

  public getValue() {
    return this.value;
  }

  public static isValid(email: string): boolean {
    return Email.REGEX.test(email);
  }
}
