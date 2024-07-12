import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly logger = new Logger(KafkaConsumerService.name);

  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka) {}

  async onModuleInit() {
    // Conectar al cliente Kafka y suscribirse al topic
    try {
      this.kafkaService.subscribeToResponseOf('my-topic');
      await this.kafkaService.connect();
      this.logger.log('Connected to Kafka and subscribed to topic successfully');

    } catch (error) {
      this.logger.error(`Error connecting to Kafka or subscribing to topic: ${error.message}`);
    }
  }

}
