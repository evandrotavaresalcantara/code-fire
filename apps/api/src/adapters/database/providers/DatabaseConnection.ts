export interface DatabaseConnection {
  query<DataQuery>(statement: string, params?: unknown): Promise<DataQuery>;
  close(): Promise<void>;
}
