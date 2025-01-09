import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from 'nestjs-telegram';

@Module({
  imports: [
    TelegramModule.forRoot({
      botKey: '7634996757:AAGIFfmklQ4fT1-zanrbEzLW-7sp_rvK0O0',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
