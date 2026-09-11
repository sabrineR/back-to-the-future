import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: number;
    email: string;
    role: 'customer' | 'admin';
}

export class AuthService {
    public static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public static async comparePassword(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    public static generateToken(payload: TokenPayload): string {
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not configured');
        }

        return jwt.sign(payload, jwtSecret, {
            expiresIn: '1d',
        });
    }
}
