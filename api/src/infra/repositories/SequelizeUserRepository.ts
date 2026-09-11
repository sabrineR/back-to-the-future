import { Result } from '../../core/logic/Result';
import { User } from '@/domain/entities/user';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User as UserModel } from '../database/models/user';
import { UserMap } from '@/domain/mappers/UserMap';

export class SequelizeUserRepository implements UserRepository {
    public async findByEmail(email: string): Promise<Result<User | null>> {
        try {
            const user = await UserModel.findOne({
                where: {
                    email: email.trim().toLowerCase(),
                },
            });

            if (!user) {
                return Result.ok<User | null>(null);
            }

            const userOrError = UserMap.toDomain(user);

            if (userOrError.isFailure) {
                return Result.fail<User | null>(userOrError.errorValue());
            }

            return Result.ok<User | null>(userOrError.getValue());
        } catch (error) {
            return Result.fail<User | null>(
                error instanceof Error
                    ? error.message
                    : 'Unable to find user by email'
            );
        }
    }
}
