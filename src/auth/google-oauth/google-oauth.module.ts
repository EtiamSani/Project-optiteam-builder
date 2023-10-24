import { Module } from '@nestjs/common';
import { GoogleOauthController } from '../google-oauth/google-oauth.controller';
import { GoogleOauthStrategy } from '../strategy/google.strategy';
import { AuthService } from '../auth.service';
import { AuthModule } from '../auth.module';
import { GoogleOauthService } from './google-oauth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategy';
import { JwtService } from '@nestjs/jwt';
import { ErrorHandlerService } from 'src/errors/errorHandler.service';

@Module({
    imports: [     
        PassportModule.register({      
            defaultStrategy: 'jwt',      
            property: 'user',      
            session: false,    
        }),
    ],  
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy,GoogleOauthService,JwtService,ErrorHandlerService],
})
export class GoogleOauthModule {}
