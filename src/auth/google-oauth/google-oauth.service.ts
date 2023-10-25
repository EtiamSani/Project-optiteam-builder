import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ErrorHandlerService } from 'src/errors/errorHandler.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class GoogleOauthService {

  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService, private errorHandlerService: ErrorHandlerService) {
  }

  async googleLogin(req, res) {
  // Récupérez le jeton d'accès
  const googleAccessToken = req.user.googleAccesstoken;
  console.log(googleAccessToken)

  if (!googleAccessToken) {
    return res.status(401).json({ message: 'No access token found' });
  }

  try {

    const user = req.user
   
    const { email, username } = user;

     // Vérifiez si l'utilisateur existe dans la base de données
     let existingUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
    
      existingUser = await this.googleSignup({ email, username });
      return res.status(200).json({ message: 'User information saved' });
    } else {
      res.setHeader('Authorization', 'Bearer ' + googleAccessToken);
      return res.status(200).json({ message: 'User connected' });
    }
    
  } catch (error) {
    return res.status(500).json({ message: 'Error decoding or saving user information' });
  }
}

async googleSignup(data) {
  const password = await argon.hash(data.email);
  console.log(password)
  try {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password,
        username: data.username, 
      },
    });
   return user
  } catch (error) {
    // Handle any errors that occur during user creation
  }
}


}