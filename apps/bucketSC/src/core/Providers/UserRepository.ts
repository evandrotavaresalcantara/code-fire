import { User } from "../model";

export interface UserRepository {
  create(user: User): Promise<string>;
  deleteByEmail(email: string): Promise<void>;
  update(user: User): Promise<void>;
  getByApiKey(apiKey: string): Promise<User | undefined>;
}
