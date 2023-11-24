import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto, SignInDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { CredentialsIncorrectException } from "../errors/httpExeption";
import { ErrorHandlerService } from "../errors/errorHandler.service";


@Injectable({})
export class AuthService {
    
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService, private errorHandlerService: ErrorHandlerService) {
    }

    async signup(dto : AuthDto) {
        const password = await argon.hash(dto.password); 
        try {
            
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password,
                    username :dto.username,
                    teamId: dto.teamId
                },
    
            });
            return this.signToken(user.id, user.email, user.teamId);
        } catch(error) {
            // récupérer les erreurs envoyé par prisma
            if (error instanceof PrismaClientKnownRequestError) { 
                // Code erreur spécifique pour signaler quand un champs unique a été violé 
                this.errorHandlerService.handle(error);
            }
            throw error;
        }
    }

    async signin(dto : SignInDto) {

        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email,
            }
        })
        // Ici j'utilise la fonctionnalité Guard de nest afin de rejeter les tentatives de connection avec des adresses mail est inexistant 

        if (!user)
        throw new CredentialsIncorrectException();

    const passwordMatches = await argon.verify(user.password, dto.password);

    if (!passwordMatches)
    throw new CredentialsIncorrectException();

        return this.signToken(user.id, user.email, user.teamId);
    }

   async signToken(userId: number, email:string, teamId:number): Promise<{ acces_token: string }>{
    const payload = {
        userId: userId,
        email
    }

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret
    });
    return {
        acces_token: token,
    };
}
}