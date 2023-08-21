import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller'; // Importation du contrôleur à tester
import { AuthService } from '../auth.service'; // Importation du service utilisé par le contrôleur

describe('AuthController', () => { // Déclaration d'une suite de tests pour le AuthController
  let authController: AuthController; // Déclaration d'une variable pour stocker le contrôleur
  let authService: AuthService; // Déclaration d'une variable pour stocker le service

  beforeEach(async () => {
    // Avant chaque test, crée un module de test avec AuthController comme contrôleur et AuthService comme fournisseur de service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController], // Liste des contrôleurs à inclure dans le module de test
      providers: [AuthService], // Liste des services à inclure dans le module de test
    }).compile(); // Compile le module de test

    authController = module.get<AuthController>(AuthController); // Récupère une instance du contrôleur du conteneur d'injection de dépendances
    authService = module.get<AuthService>(AuthService); // Récupère une instance du service du conteneur d'injection de dépendances
  });

  describe('signup', () => {
    it('should return a new user when signing up', async () => {
      // Mock the behavior of the AuthService
      const mockUser = { id: 1, username: 'testuser' };
      authService.signup = jest.fn().mockReturnValue(mockUser);

      // Call the signup method on the AuthController
      const result = await authController.signup();

      // Assertions
      expect(result).toEqual(mockUser); // Vérifie que le résultat est conforme aux attentes
      expect(authService.signup).toHaveBeenCalled(); // Vérifie que la méthode du service a été appelée
    });
  });

  describe('signin', () => {
    it('should return a JWT token when signing in', async () => {
      // Mock le comportement de AuthService
      const mockToken = 'mocked-jwt-token';
      authService.signin = jest.fn().mockReturnValue({ access_token: mockToken });

      // appel signin method du AuthController
      const result = await authController.signin();

      // Assertions
      expect(result).toEqual({ access_token: mockToken }); // Vérifie que le résultat est conforme aux attentes
      expect(authService.signin).toHaveBeenCalled(); // Vérifie que la méthode du service a été appelée
    });
  });
});

