import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { NewTransactionMessageDto } from './dtos/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('agent_submitted_new_tx')
  async subscriber(txData: NewTransactionMessageDto): Promise<void> {
    console.info('new message from crawler');
    await this.appService.notifyNewTransaction(txData);
  }
}
