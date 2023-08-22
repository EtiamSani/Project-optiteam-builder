import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

//Pour connecter notre logique à la bdd
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config : ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        });
    }
    cleanDb() {
        return this.$transaction([
            this.user.deleteMany(),
            this.team.deleteMany(),
            this.employee.deleteMany(),
            this.skill.deleteMany(),
            this.skillToEmployee.deleteMany(),

        ])
        
    }
}
