import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {

    }
    async signup(dto : AuthDto) {
        const password = await argon.hash(dto.password);
        const username = dto.username;
        try {
            
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password,
                    username,
                },
    
            });
            delete user.password
            
            return user;
        } catch(error) {
            // récupérer les erreurs envoyé par prisma
            if (error instanceof PrismaClientKnownRequestError) { 
                // Code erreur spécifique pour signaler quand un champs unique a été violé 
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken'
                    );
                }
            }
            throw error;
        }
    }

    signin() {
        return {msg: 'sing'}
    }
}