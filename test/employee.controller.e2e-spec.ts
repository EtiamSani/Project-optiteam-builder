import {
    INestApplication,
    ValidationPipe,
  } from '@nestjs/common';
  import { Test } from '@nestjs/testing';
  import * as pactum from 'pactum';
  import { AppModule } from '../src/app.module';
  import { PrismaService } from '../src/prisma/prisma.service';
import { CreateEmployeeDto, EditEmployeeDto } from 'src/employee/dto';
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

       

        describe('Employee',()=> {

            describe('Get empty employee',()=> {
              describe('Get empty employees', () => {
                  it('should get employees', () => {
                    return pactum
                      .spec()
                      .get('/employees')
                      .expectStatus(200)
                      .expectBody([]);
                  });
              })
          })

          describe('Create team for employee', () => {
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
            });
          });

          describe('Create employee', () => {
            const dto: CreateEmployeeDto = {
              lastname: 'Bob',
              firstname: 'testing',
              job:'developper',
              personality: 'introvert',
              teamId: 1,
              skills: 'dev', 
            };
            it('should create employee', () => {
              return pactum
                .spec()
                .post('/employees')
                // .withHeaders({
                //   Authorization: 'Bearer $S{userAt}',
                // })
                .withBody(dto)
                .expectStatus(201)
                .stores('employeeId', 'id');
            });
          });

          describe('Edit employee', () => {
            const dto: EditEmployeeDto = {
              lastname: 'BOB Edit',
            };
            it('should edit employee', () => {
              return pactum
                .spec()
                .patch('/employees/{id}')
                .withPathParams('id', '$S{employeeId}')
                // .withHeaders({
                //   Authorization: 'Bearer $S{userAt}',
                // })
                .withBody(dto)
                .expectStatus(200)
            });
            
          });

          describe('Delete employee', () => {
            
          });

          describe('Get one employee by id', () => {
            
          });

            // describe('Find All Employees', () => {
            //     it('should find all employees', () => {
            //       return pactum
            //         .spec()
            //         .get('/users/employees')
            //         .expectStatus(400);
            //     });
            //     it('should find one employee', () => {
            //       return pactum
            //         .spec()
            //         .get('/users/employees')
            //         .expectStatus(400);
            //     });
            //     it('should create an employee', () => {
            //         return pactum
            //           .spec()
            //           .get('/users/employees')
            //           .expectStatus(400);
            //       });
            //       it('should delete an employee', () => {
            //         return pactum
            //           .spec()
            //           .get('/users/employees')
            //           .expectStatus(400);
            //       });
            //       it('should update an employee', () => {
            //         return pactum
            //           .spec()
            //           .get('/users/employees')
            //           .expectStatus(400);
            //       });
            // })
            
            
        })

       
        
    })
})