import { LoginUseCase } from '@/application/useCases/auth/Login/LoginUseCase';
import { SequelizeUserRepository } from '@/infra/repositories/SequelizeUserRepository';
import { AuthController } from '@/presentation/controllers/auth/AuthController';

const userRepository = new SequelizeUserRepository();

const loginUseCase = new LoginUseCase(userRepository);

export const authController = new AuthController(loginUseCase);
