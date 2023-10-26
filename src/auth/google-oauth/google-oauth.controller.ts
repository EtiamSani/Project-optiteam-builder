import { Body, Controller, Post} from '@nestjs/common';
import { GoogleOauthService } from './google-oauth.service';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.OAUTH_GOOGLE_ID, process.env.OAUTH_GOOGLE_SECRET)

@Controller('auth')
export class GoogleOauthController {
  constructor(private authService: GoogleOauthService) {}


  @Post('/login/google')
  async login(@Body('token') token ,  @Body('teamId') teamId: any): Promise<any> {
    const teamIdAsInt = parseInt(teamId, 10);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_GOOGLE_ID,
    });

    const payload = ticket.getPayload();
    const data = await this.authService.login({
      email: payload.email,
      name: payload.name,
      image: payload.picture,
      teamId: teamIdAsInt
    })
    return data;
  }
}

  
