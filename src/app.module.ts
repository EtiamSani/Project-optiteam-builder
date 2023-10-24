import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { TeamModule } from './team/team.module';
import { SkillsModule } from './skills/skills.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GoogleOauthModule } from './auth/google-oauth/google-oauth.module';

@Module({
  //configModule c'est pour charger notre .env dans notre application
  imports: [UserModule, AuthModule, PrismaModule, ConfigModule.forRoot({isGlobal: true,}), EmployeeModule, TeamModule, SkillsModule,ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'), 
    serveRoot: '/public', // L'URL à laquelle les ressources statiques seront servies
  }), GoogleOauthModule],
})
export class AppModule {}
