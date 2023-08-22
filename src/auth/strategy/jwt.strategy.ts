import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService} from '@nestjs/config'


// Logique qui permet de vérifié le token d'authentification recu
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,
    ) {
        constructor(config : ConfigService) {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: config.get("JWT_SECRET"),
            })
        }

}