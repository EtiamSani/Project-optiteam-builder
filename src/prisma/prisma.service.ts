import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//Pour connecter notre logique à la bdd
@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: "mysql://root:optiteam@localhost:3306/optiteam?schema=public"
                }
            }
        })
    }
}
