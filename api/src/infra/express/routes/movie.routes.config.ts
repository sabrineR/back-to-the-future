import { Router } from 'express';
import { movieController } from '../dependencies/movieDependencies';
import { requireAdmin } from '@/presentation/middlewares/authMiddleware';

export class MovieRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.movieRoutes();
    }

    protected movieRoutes(): void {
        this.router.get('/', movieController.getAll);
        this.router.get('/:id', movieController.getById);

        // Routes for Admin
        this.router.post('/', movieController.create);
        this.router.patch('/:id', requireAdmin, movieController.update);
        this.router.delete('/:id', requireAdmin, movieController.delete);
    }
}
