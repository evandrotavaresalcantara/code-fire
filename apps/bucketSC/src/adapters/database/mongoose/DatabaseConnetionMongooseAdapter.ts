import mongoose, { Connection } from "mongoose";
import { DatabaseConnection } from "../DatabaseConnection";

export class DatabaseConnectionMongooseAdapter implements DatabaseConnection {
  readonly connection: Connection;
  constructor(
    private username = "admin",
    private password = "123456",
    private clusterURL = "localhost",
    private port = "27017",
    private database = "bucket"
  ) {
    this.connection = mongoose
      .createConnection(
        `mongodb://${this.username}:${this.password}@${this.clusterURL}:${this.port}`
      )
      .useDb(this.database)
      .on("open", () => console.log("Mongodb Connected"))
      .on("error", () => console.log("Mongodb error"));
  }

  close(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
