import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from '../guard/google-oauth.guard';
import { AuthService } from '../auth.service';
import { GoogleOauthService } from './google-oauth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class GoogleOauthController {
  constructor(private authService: GoogleOauthService) {}

  @Get('login')
  @UseGuards(GoogleOauthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // For now, we'll just show the user object
    // return req.user;
    return this.authService.googleLogin(req,res)
  }
  @Get('logout')
logout(@Req() req: Request, @Res() res: Response) {
  // Déconnexion de l'utilisateur en supprimant les données d'authentification
  delete req.user; // Ou réinitialisez req.user à null ou undefined
  res.json(req.user)
  // Redirection de l'utilisateur vers la page de connexion ou une autre page de votre choix
  
}
  
}