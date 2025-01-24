export interface DatabaseConnection {
  close(): Promise<void>;
}
