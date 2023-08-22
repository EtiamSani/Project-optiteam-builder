import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  //configModule c'est pour charger notre .env dans notre application
  imports: [UserModule, AuthModule, PrismaModule, ConfigModule.forRoot({isGlobal: true,})],
})
export class AppModule {}
