import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { ormConfig } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    UserModule,
    // .env 파일의 내용을 불러오기 위해 process.env를 사용함 이를 config 모듈을 import 해준다
    ConfigModule.forRoot({
      // ConfigModule을 전역으로 사용할 것인가
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
