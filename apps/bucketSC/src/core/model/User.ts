import crypto from "node:crypto";
import { Email } from "./valueObjects";

export class User {
  private id?: string;
  private name: string;
  private email: Email;
  private apiKey: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    name: string,
    email: string,
    apiKey: string,
    createdAt: Date,
    updatedAt: Date,
    id?: string
  ) {
    this.name = name;
    this.email = new Email(email);
    this.apiKey = apiKey;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
    this.id = id;
  }

  static register(name: string, email: string) {
    return new User(name, email, this.newApiKey(email), new Date(), new Date());
  }

  static newApiKey(email?: string) {
    const data = `${email ?? "bucket@zmail.com"}${new Date().getTime()}`;
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email.getValue();
  }

  getApiKey() {
    return this.apiKey;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}
