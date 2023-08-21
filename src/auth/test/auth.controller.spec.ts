import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should return a new user when signing up', async () => {
      // Mock the behavior of the AuthService
      const mockUser = { id: 1, username: 'testuser' };
      authService.signup = jest.fn().mockReturnValue(mockUser);

      // Call the signup method on the AuthController
      const result = await authController.signup();

      // Assertions
      expect(result).toEqual(mockUser);
      expect(authService.signup).toHaveBeenCalled();
    });
  });

  describe('signin', () => {
    it('should return a JWT token when signing in', async () => {
      // Mock the behavior of the AuthService
      const mockToken = 'mocked-jwt-token';
      authService.signin = jest.fn().mockReturnValue(mockToken);

      // Call the signin method on the AuthController
      const result = await authController.signin();

      // Assertions
      expect(result).toEqual({ access_token: mockToken });
      expect(authService.signin).toHaveBeenCalled();
    });
  });
});
