import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service'; // Importation du service à tester


describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
          providers: [AuthService],
      }).compile();

      authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
      expect(authService).toBeDefined();
  });

  describe('signup', () => {
      it('should create a new user when valid data is provided', async () => {
          const userData = {
              username: 'testuser',
              password: 'password',
              // other relevant data
          };
          const createdUser = await authService.signup(userData);
          
          // Assertions
          expect(createdUser).toBeDefined();
          expect(createdUser.username).toEqual(userData.username);
      });

      it('should throw an error when invalid data is provided', async () => {
          const userData = {
              // incomplete or invalid data
          };

          // Assertions using Jest's toThrow
          await expect(authService.signup(userData)).rejects.toThrow();
      });
  });

  describe('signin', () => {
      it('should return a JWT token when valid credentials are provided', async () => {
          const credentials = {
              username: 'testuser',
              password: 'password',
          };
          const jwtToken = await authService.signin(credentials);

          // Assertions
          expect(jwtToken).toBeDefined();
          // Additional assertions about token validity, format, etc.
      });

      it('should throw an error when invalid credentials are provided', async () => {
          const credentials = {
              username: 'testuser',
              password: 'wrongpassword',
          };

          // Assertions using Jest's toThrow
          await expect(authService.signin(credentials)).rejects.toThrow();
      });
  });

  // Add more test cases for other methods of the AuthService if applicable

});