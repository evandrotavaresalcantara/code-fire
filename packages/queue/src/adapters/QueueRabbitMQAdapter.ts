import amqp, { Channel, Connection, Message } from "amqplib";
import { Queue } from "../provider";

export class RabbitMQAdapter implements Queue {
  private static instance: RabbitMQAdapter; // Propriedade Singleton para a instância única

  private readonly url: string;
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  private constructor(
    amqpUser?: string,
    amqpPassword?: string,
    amqpHost?: string,
    amqpPort?: string
  ) {
    this.url = `amqp://${amqpUser ?? "admin"}:${amqpPassword ?? "123"}@${
      amqpHost ?? "localhost"
    }:${amqpPort ?? "5672"}`;
  }

  // Método estático para obter a instância Singleton
  public static getInstance(
    amqpUser?: string,
    amqpPassword?: string,
    amqpHost?: string,
    amqpPort?: string
  ): RabbitMQAdapter {
    if (!RabbitMQAdapter.instance) {
      RabbitMQAdapter.instance = new RabbitMQAdapter(
        amqpUser,
        amqpPassword,
        amqpHost,
        amqpPort
      );
    }
    return RabbitMQAdapter.instance;
  }

  private async ensureConnection() {
    if (!this.connection || !this.channel) {
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();
    }
  }

  async connect(): Promise<void> {
    await this.ensureConnection();
  }

  async disconnect(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }

  async publish<TypeData>(
    queueNames: string | string[],
    data: TypeData
  ): Promise<void> {
    await this.connect();
    const queues = Array.isArray(queueNames) ? queueNames : [queueNames];
    if (this.channel) {
      await Promise.allSettled(
        queues.map(async (queueName) => {
          await this.channel?.assertQueue(queueName, { durable: true });
          this.channel?.sendToQueue(
            queueName,
            Buffer.from(JSON.stringify(data))
          );
        })
      );
    }
  }

  async consume<TypeInput>(
    queueName: string,
    callback: (input: TypeInput) => Promise<void> | void
  ): Promise<void> {
    await this.connect();
    if (this.channel) {
      await this.channel.assertQueue(queueName, { durable: true });
      await this.channel.consume(queueName, async (msg: Message | null) => {
        if (msg) {
          try {
            const input = JSON.parse(msg.content.toString()) as TypeInput;
            await callback(input);
            this.channel?.ack(msg);
          } catch (error) {
            console.error(
              "Erro no Consumer ao processar mensagem:",
              error instanceof Error ? error.message : error
            );
            this.channel?.nack(msg, false, true); // Ou false para descartar a mensagem
          }
        }
      });
    }
  }
}
