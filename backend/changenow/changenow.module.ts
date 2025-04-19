import { Module } from '@nestjs/common';
import { ChangeNowController } from './changenow.controller';
import { ChangeNowService } from './changenow.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ChangeNowController],
  providers: [ChangeNowService],
  exports: [ChangeNowService],
})
export class ChangeNowModule {}
