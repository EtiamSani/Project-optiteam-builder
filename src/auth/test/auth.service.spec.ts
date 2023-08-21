import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service'; // Importation du service à tester

describe('AuthService', () => { // Déclaration d'une suite de tests pour le AuthService
    let service: AuthService; // Déclaration d'une variable pour stocker le service à tester
    
    beforeEach(async () => {
        // Avant chaque test, crée un module de test avec le AuthService comme fournisseur de service
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService], // Liste des services à inclure dans le module de test
        }).compile(); // Compile le module de test
        
        service = module.get<AuthService>(AuthService); // Récupère une instance du service du conteneur d'injection de dépendances
    });
    
    // Définition d'un test
    it('should be defined', () => {
        // Vérifie que le service est défini (non nul)
        expect(service).toBeDefined();
    });
});
