import { ENV } from "@/config";
import pgp, { IDatabase } from "pg-promise";
import { DatabaseConnection } from "../providers";

export class PgPromiseAdapter implements DatabaseConnection {
  connection: IDatabase<object>;

  constructor() {
    this.connection = pgp()(ENV.DATABASE_URL ?? "");
  }

  query<DataQuery>(statement: string, params?: unknown): Promise<DataQuery> {
    return this.connection?.query(statement, params);
  }

  async close(): Promise<void> {
    await this.connection?.$pool.end();
  }
}
