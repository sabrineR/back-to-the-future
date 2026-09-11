import { Router } from 'express';
import { authController } from '../dependencies/authDependencies';

export class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.authRoutes();
    }

    protected authRoutes(): void {
        this.router.post('/login', authController.login);
    }
}
