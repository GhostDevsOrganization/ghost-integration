import { Module } from '@nestjs/common';
import { SoundcloudService } from './soundcloud.service';
import { SoundcloudController } from './soundcloud.controller';

@Module({
    controllers: [SoundcloudController],
    providers: [SoundcloudService],
    exports: [SoundcloudService],
})
export class SoundcloudModule { }
