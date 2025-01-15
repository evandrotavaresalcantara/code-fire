import { MongoClient } from "mongodb";
import { DatabaseConnection } from "../DatabaseConnection";

export class DatabaseConnectionMongodbAdapter implements DatabaseConnection {
  readonly connection: MongoClient;
  constructor(
    private username = "admin",
    private password = "123456",
    private clusterURL = "localhost",
    private port = "27017",
    private database = "bucket"
  ) {
    this.connection = new MongoClient(
      `mongodb://${this.username}:${this.password}@${this.clusterURL}:${this.port}`
    );
  }

  async connect() {
    await this.connection.connect();
    console.log("Conectado ao MongoDB");
  }

  async close(): Promise<void> {
    await this.connection.close();
    console.log("Desconectado do MongoDB");
  }
}
