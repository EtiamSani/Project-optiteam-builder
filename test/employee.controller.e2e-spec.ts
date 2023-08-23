import {
    INestApplication,
    ValidationPipe,
  } from '@nestjs/common';
  import { Test } from '@nestjs/testing';
  import * as pactum from 'pactum';
  import { AppModule } from '../src/app.module';
  import { PrismaService } from '../src/prisma/prisma.service';

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

        describe('Employee',()=> {
            describe('Find All Employees', () => {
                it('should find all employees', () => {
                  return pactum
                    .spec()
                    .get('/users/employees')
                    .expectStatus(400);
                });
            })
        })

        describe('Employee',()=> {
            describe('Find All Employees', () => {
                it('should find all employees', () => {
                  return pactum
                    .spec()
                    .get('/users/employees')
                    .expectStatus(400);
                });
                it('should find one employee', () => {
                  return pactum
                    .spec()
                    .get('/users/employees')
                    .expectStatus(400);
                });
                it('should create an employee', () => {
                    return pactum
                      .spec()
                      .get('/users/employees')
                      .expectStatus(400);
                  });
                  it('should delete an employee', () => {
                    return pactum
                      .spec()
                      .get('/users/employees')
                      .expectStatus(400);
                  });
                  it('should update an employee', () => {
                    return pactum
                      .spec()
                      .get('/users/employees')
                      .expectStatus(400);
                  });
            })
            
            
        })

       
        
    })
})