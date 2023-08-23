import { HttpException, HttpStatus } from "@nestjs/common";

export class CredentialsIncorrectException extends HttpException {
    constructor() {
        super("Couple identifiant/mot de passe incorrect", HttpStatus.FORBIDDEN);
    }
}
