import { Result } from '../../core/logic/Result';
import { User } from '../entities/user';
import { User as UserModel } from '@/infra/database/models/user';

export class UserMap {
    public static toDomain(raw: UserModel): Result<User> {
        return User.create(
            {
                fullName: raw.fullName,
                email: raw.email,
                password: raw.password,
                role: raw.role,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
            },
            raw.id
        );
    }
}
