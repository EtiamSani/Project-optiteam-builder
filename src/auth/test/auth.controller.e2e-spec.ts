import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as request from 'supertest';


describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Importez le module principal
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username: 'testuser', password: 'testpassword' })
      .expect(201) // Code de statut attendu
      .expect((res) => {
        // Vérifiez le corps de la réponse
        expect(res.body.message).toEqual('User registered successfully');
      });
  });
  
  it('/auth/signin (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username: 'testuser', password: 'testpassword' })
      .expect(200)
      .expect((res) => {
        // Vérifiez le corps de la réponse
        expect(res.body.access_token).toBeDefined();
      });
  });
  
});


