import { Result } from '@/core/logic/Result';
import { UseCase } from '@/core/logic/UseCase';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { AuthService } from '@/shared/services/AuthService';
import { LoginRequestDto } from './LoginRequestDto';
import { LoginResponseDto } from './LoginResponseDto';

type LoginResponse = Result<LoginResponseDto>;

export class LoginUseCase implements UseCase<LoginRequestDto, LoginResponse> {
    constructor(private readonly userRepository: UserRepository) {}

    public async execute(request: LoginRequestDto): Promise<LoginResponse> {
        const { email, password } = request;

        if (!email || !password) {
            return Result.fail<LoginResponseDto>(
                'Email and password are required'
            );
        }

        const userResult = await this.userRepository.findByEmail(email);

        if (userResult.isFailure) {
            return Result.fail<LoginResponseDto>(userResult.errorValue());
        }

        const user = userResult.getValue();

        if (!user) {
            return Result.fail<LoginResponseDto>('Invalid email or password');
        }

        const passwordIsValid = await AuthService.comparePassword(
            password,
            user.password
        );

        if (!passwordIsValid) {
            return Result.fail<LoginResponseDto>('Invalid email or password');
        }

        if (user.role !== 'admin') {
            return Result.fail<LoginResponseDto>('Access denied');
        }

        const token = AuthService.generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return Result.ok<LoginResponseDto>({
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        });
    }
}
