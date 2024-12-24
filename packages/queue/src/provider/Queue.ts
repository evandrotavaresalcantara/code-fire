export interface Queue {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  consume<TypeInput>(
    queueName: string,
    callback: (input: TypeInput) => Promise<void> | void
  ): Promise<void>;

  publish<TypeData>(
    queueNames: string | string[],
    data: TypeData
  ): Promise<void>;
}
