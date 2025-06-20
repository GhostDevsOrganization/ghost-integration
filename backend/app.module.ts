import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ChangeNowModule } from './changenow/changenow.module';
import { PaymentModule } from './payment/payment.module';
import { SoundcloudModule } from './soundcloud/soundcloud.module';
import { OracleModule } from './oracle/oracle.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { validateEnv } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath: ['.env.local', '.env'],
    }),
    // Temporarily disabled MongoDB for SoundCloud testing
    // MongooseModule.forRootAsync({
    //   useFactory: () => ({
    //     uri: process.env.MONGODB_URI || 'mongodb://localhost/change-now-v2',
    //   }),
    // }),
    ChangeNowModule,
    PaymentModule,
    SoundcloudModule,
    OracleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('health') // Optional: exclude health check endpoint from auth
      .forRoutes('*');
  }
}
