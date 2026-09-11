import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpRequestDto } from '@/presentation/http/HttpRequest';

interface JwtPayload {
    userId: number;
    email: string;
    role: 'customer' | 'admin';
}

export const requireAdmin = (
    req: HttpRequestDto,
    res: Response,
    next: NextFunction
): void => {
    const authorizationHeader = req.headers?.authorization;

    if (!authorizationHeader?.startsWith('Bearer ')) {
        res.status(401).json({
            message: 'Authentication required',
        });
        return;
    }

    const token = authorizationHeader.substring(7);

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        res.status(500).json({
            message: 'JWT configuration is missing',
        });
        return;
    }

    try {
        const payload = jwt.verify(token, jwtSecret) as JwtPayload;

        if (payload.role !== 'admin') {
            res.status(403).json({
                message: 'Admin access required',
            });
            return;
        }

        req.user = {
            id: payload.userId,
            email: payload.email,
            role: payload.role,
        };

        next();
    } catch {
        res.status(401).json({
            message: 'Invalid or expired token',
        });
    }
};
