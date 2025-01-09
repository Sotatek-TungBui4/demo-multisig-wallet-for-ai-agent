import { Injectable } from '@nestjs/common';
import { TelegramService } from 'nestjs-telegram';
import { NewTransactionMessageDto } from './dtos/message.dto';

@Injectable()
export class AppService {
  constructor(private readonly telegram: TelegramService) {}

  async notifyNewTransaction(data: NewTransactionMessageDto) {
    await this.telegram
      .sendMessage({
        text: `Agent bot submitted a new transaction at block ${data.blockNumber}!
Transaction id: **${data.id}**
Transaction index: **${data.txIndex}**
Transaction data: **\`${data.data}\`**
Transaction value: **${data.value} ETH**
Transaction hash: **https://etherscan.io/tx/${data.txHash}**
`,
        parse_mode: 'markdown',
        chat_id: '-4687641510',
      })
      .toPromise();
  }
}
