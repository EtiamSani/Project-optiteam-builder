import {
    INestApplication,
    ValidationPipe,
  } from '@nestjs/common';
  import { Test } from '@nestjs/testing';
  import * as pactum from 'pactum';
  import { AppModule } from '../src/app.module';
  import { PrismaService } from '../src/prisma/prisma.service';
  import { CreateTeamDto } from 'src/team/dto';
import { CreateSkillsDto } from 'src/skills/dto';
  
  
  describe('EmployeeController (e2e)', () => {
    describe('Skills e2e', () => {
      let app: INestApplication;
      let prisma: PrismaService;
  
      beforeAll(async () => {
        const moduleRef =
          await Test.createTestingModule({
            imports: [AppModule],
          }).compile();
  
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
          new ValidationPipe({
            whitelist: true,
          }),
        );
        await app.init();
        await app.listen(3333);
  
        prisma = app.get(PrismaService);
        await prisma.cleanDb();
        pactum.request.setBaseUrl(
          'http://localhost:3333',
        );
      });
  
      afterAll(() => {
        app.close();
      });

      describe('Create Skills', () => {
        const dto: CreateSkillsDto = {
            name: 'Java',
          };
        it('should create skill', () => {
            return pactum
            .spec()
            .post('/skills')
            // .withHeaders({
            //   Authorization: 'Bearer $S{userAt}',
            // })
            .withBody(dto)
            .expectStatus(201)
            .stores('skillId', 'id');
          });
      });

      describe('Get Skills', () => {
        it('should get skills', () => {
            return pactum
              .spec()
              .get('/skills')
              // .withHeaders({
              //   Authorization: 'Bearer $S{userAt}',
              // })
              .expectStatus(200)
          });
      });

      describe('Get skill', () => {
        it('should get skill by id', () => {
            return pactum
              .spec()
              .get('/skills/{id}')
              .withPathParams('id', '$S{skillId}')
              // .withHeaders({
              //   Authorization: 'Bearer $S{userAt}',
              // })
              .expectStatus(200)
          });
      });

      describe('Edit skill', () => {
        const dto: CreateSkillsDto = {
            name: 'JavaScript',
          };
          it('should edit skill', () => {
            return pactum
              .spec()
              .patch('/skills/{id}')
              .withPathParams('id', '$S{skillId}')
              // .withHeaders({
              //   Authorization: 'Bearer $S{userAt}',
              // })
              .withBody(dto)
              .expectStatus(200)
          });
      });

      describe('Delete team', () => {
        it('should delete employee', () => {
            return pactum
              .spec()
              .delete('/skills/{id}')
              .expectStatus(204)
              .withPathParams('id', '$S{skillId}')
          });
      });

    })
})