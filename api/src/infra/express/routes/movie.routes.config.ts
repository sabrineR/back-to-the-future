import { Router } from 'express';
import { movieController } from '../dependencies/movieDependencies';

export class MovieRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.movieRoutes();
    }

    protected movieRoutes(): void {
        this.router.post('/', movieController.create);
        this.router.get('/', movieController.getAll);
        this.router.get('/:id', movieController.getById);
        this.router.patch('/:id', movieController.update);
        this.router.delete('/:id', movieController.delete);
    }
}
