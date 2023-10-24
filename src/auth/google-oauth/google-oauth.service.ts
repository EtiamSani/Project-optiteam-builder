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

//   async googleSignup(dto : AuthDto) {
//     const password = await argon.hash(dto.password); 
//     try {
        
//         const user = await this.prisma.user.create({
//             data: {
//                 email: dto.email,
//                 password,
//                 username :dto.username,
//                 teamId: dto.teamId
//             },

//         });
//         return this.signToken(user.id, user.email, user.teamId);
//     } catch(error) {
//         // récupérer les erreurs envoyé par prisma
//         if (error instanceof PrismaClientKnownRequestError) { 
//             // Code erreur spécifique pour signaler quand un champs unique a été violé 
//             this.errorHandlerService.handle(error);
//         }
//         throw error;
//     }
// }

// async googleLogin(req , res) {

// res.json(req.user.googleAccesstoken)

// console.log(req.user.googleAccesstoken)

//   }
async googleLogin(req, res) {
  // Récupérez le jeton d'accès
  const accessToken = req.user.googleAccesstoken;
  console.log(accessToken)

  if (!accessToken) {
    return res.status(401).json({ message: 'No access token found' });
  }

  try {
    // Décoder le jeton d'accès
    const user = req.user
    console.log(user)

    // Extrayez les informations telles que le nom et l'e-mail
    const { email, username } = user;

     // Vérifiez si l'utilisateur existe dans la base de données
     let existingUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      // L'utilisateur n'existe pas, créez-le
      existingUser = await this.googleSignup({ email, username });
      return res.status(200).json({ message: 'User information saved' });
    } else {
      return res.status(200).json({ message: 'User connected', accessToken});
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
        username: data.username, // You can change this to another value as needed
      },
    });

    // You may want to return the user or sign a JWT for the user here
   return user
  } catch (error) {
    // Handle any errors that occur during user creation
  }
}


}