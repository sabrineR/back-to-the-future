import { Result } from '../../core/logic/Result';
import { User } from '../entities/user';

export interface UserRepository {
    findByEmail(email: string): Promise<Result<User | null>>;
}
