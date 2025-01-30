import { LogoutDAO } from "@packages/auth/src";
import { Collection } from "mongodb";
import { DatabaseConnectionMongodbAdapter } from "./mongodb";

export class LogoutDAOMongoAdapter implements LogoutDAO {
  private mongodb: DatabaseConnectionMongodbAdapter;
  private databaseName = "report";
  private collectionName = "logout";
  private collection: Collection<{
    userEmail: string;
    logoutDate: Date;
  }>;

  constructor(readonly databaseConnection: DatabaseConnectionMongodbAdapter) {
    this.mongodb = databaseConnection;
    this.collection = this.mongodb.connection
      .db(this.databaseName)
      .collection(this.collectionName);
  }
  async obterTodosDoUsuarioPeloEmail(
    userEmail: string,
  ): Promise<{ userEmail: string; logoutDate: Date }[]> {
    return await this.collection
      .find({ userEmail }, { sort: { logoutDate: 1 } })
      .toArray();
  }

  async salvar(userEmail: string, logoutDate: Date): Promise<void> {
    await this.collection.insertOne({ userEmail, logoutDate });
  }
}
