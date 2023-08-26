import {
    INestApplication,
    ValidationPipe,
  } from '@nestjs/common';
  import { Test } from '@nestjs/testing';
  import * as pactum from 'pactum';
  import { AppModule } from '../src/app.module';
  import { PrismaService } from '../src/prisma/prisma.service';
  import { CreateTeamDto } from 'src/team/dto';
  
  
  describe('EmployeeController (e2e)', () => {
    describe('Auth e2e', () => {
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


      describe('Create team', () => {
        const dto: CreateTeamDto = {
            name: 'Bob team',
          };
          it('should create team', () => {
            return pactum
              .spec()
              .post('/team')
              // .withHeaders({
              //   Authorization: 'Bearer $S{userAt}',
              // })
              .withBody(dto)
              .expectStatus(201)
              .stores('teamId', 'id');
      });
    })

      describe('Get team', () => {
        it('should get team by id with employees', () => {
            return pactum
              .spec()
              .get('/team/{id}')
              .withPathParams('id', '$S{teamId}')
              // .withHeaders({
              //   Authorization: 'Bearer $S{userAt}',
              // })
              .expectStatus(200)
          });
      });

      describe('Edit team', () => {
        const dto: CreateTeamDto = {
            name: 'Team bob',
          };
          it('should edit team', () => {
            return pactum
              .spec()
              .patch('/team/{id}')
              .withPathParams('id', '$S{teamId}')
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
              .delete('/team/{id}')
              .expectStatus(204)
              .withPathParams('id', '$S{teamId}')
          });
      });
    })
})  