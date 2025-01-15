import { Collection } from "mongodb";
import { User } from "../../core/model";
import { UserRepository } from "../../core/Providers";
import { DatabaseConnectionMongodbAdapter } from "./mongoose";

export class UserRepositoryMongodbAdapter implements UserRepository {
  private mongodb: DatabaseConnectionMongodbAdapter;
  private databaseName = "bucket";
  private collectionName = "users";
  // private database: Db;
  private collection: Collection<{
    name: string;
    email: string;
    apiKey: string;
    createdAt: Date;
    updatedAt: Date;
  }>;

  constructor(readonly databaseConnection: DatabaseConnectionMongodbAdapter) {
    this.mongodb = databaseConnection;
    this.collection = this.mongodb.connection
      .db(this.databaseName)
      .collection(this.collectionName);
  }

  async create(user: User): Promise<string> {
    const result = await this.collection.insertOne({
      name: user.getName(),
      email: user.getEmail(),
      apiKey: user.getApiKey(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    });
    return result.insertedId.toHexString();
  }

  async deleteByEmail(email: string): Promise<void> {
    await this.collection.deleteOne({ email });
  }

  update(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getByApiKey(apiKey: string): Promise<User | undefined> {
    const userData = await this.collection.findOne({ apiKey });
    if (!userData) return;
    return new User(
      userData.name,
      userData.email,
      userData.apiKey,
      userData.createdAt,
      userData.updatedAt,
      userData._id.toHexString()
    );
  }
}
