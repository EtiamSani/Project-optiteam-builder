import { ForbiddenException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CredentialsIncorrectException } from "./httpExeption";

//Enfin de respecter le O du principe SOLID (Open-Closed)
//interface générique pour les gestionnaires d'erreur
export interface IErrorHandler {
    handle(error: any): void;
}

//classes pour gérer des types spécifiques d'erreurs en implémentant cette interface
export class PrismaErrorHandler implements IErrorHandler {
    handle(error: any): void {
        if (error instanceof PrismaClientKnownRequestError) { 
            if (error.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
        }
    }
}

export class AuthErrorHandler implements IErrorHandler {
    handle(error: any): void {
       if (error instanceof CredentialsIncorrectException) {
            throw error; // Gérer l'exception "Credentials incorrect"
        }
        
    }
}

//classe principale ErrorHandler qui utilise une liste de gestionnaires d'erreurs pour traiter différents types d'erreurs 
export class ErrorHandler {
    private errorHandlers: IErrorHandler[];

    constructor(handlers: IErrorHandler[]) {
        this.errorHandlers = handlers;
    }

    handle(error: any): void {
        for (const handler of this.errorHandlers) {
            handler.handle(error);
        }
        throw error;
    }
}

