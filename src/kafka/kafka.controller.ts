// kafka.controller.ts

import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload,  } from '@nestjs/microservices';
import { KafkaConsumerService } from './kafka.service'; // Asegúrate de importar tu servicio de Kafka

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaConsumerService) { }
  private readonly logger = new Logger(KafkaController.name);

  @MessagePattern('my-topic')
  async handleMessage(@Payload() message: any) {
    this.logger.log(`Received message from Kafka: ${JSON.stringify(message)}`);
    const messageRecived = message.toString()
    try {
      console.log(messageRecived)
    } catch (error) {
      this.logger.error(`Error processing Kafka message: ${error.message}`);
    }
  }
}
