import { LoginDAO } from "@packages/auth/src";
import { Collection } from "mongodb";
import { DatabaseConnectionMongodbAdapter } from "./mongodb";

export class LoginDaoMongoAdapter implements LoginDAO {
  private mongodb: DatabaseConnectionMongodbAdapter;
  private databaseName = "report";
  private collectionName = "login";
  // private database: Db;
  private collection: Collection<{
    userEmail: string;
    loginType: string;
    is2fa: boolean;
    loginDate: Date;
  }>;

  constructor(readonly databaseConnection: DatabaseConnectionMongodbAdapter) {
    this.mongodb = databaseConnection;
    this.collection = this.mongodb.connection
      .db(this.databaseName)
      .collection(this.collectionName);
  }
  async obterTodosDoUsuarioPeloEmail(
    userEmail: string,
  ): Promise<
    { userEmail: string; loginType: string; is2fa: boolean; loginDate: Date }[]
  > {
    return await this.collection
      .find({ userEmail }, { sort: { loginDate: 1 } })
      .toArray();
  }

  async salvar(
    userEmail: string,
    loginType: string,
    is2fa: boolean,
    loginDate: Date,
  ): Promise<void> {
    await this.collection.insertOne({ userEmail, loginType, is2fa, loginDate });
  }

  async obterUltimoPeloEmail(userEmail: string): Promise<{
    userEmail: string;
    loginType: string;
    is2fa: boolean;
    loginDate: Date;
  } | null> {
    return await this.collection.findOne(
      { userEmail },
      { sort: { loginDate: -1 } },
    );
  }
}
