import {Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { ErrorHandlerService } from '../errors/errorHandler.service';
import { GoogleOauthStrategy } from './strategy/google.strategy';

@Module({
   imports: [JwtModule.register({})],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy, ErrorHandlerService,JwtService,GoogleOauthStrategy],
})
export class AuthModule {}