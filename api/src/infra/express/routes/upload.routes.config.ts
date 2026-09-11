import { Router } from 'express';
import { UploadController } from '@/presentation/controllers/uploadFile/UploadController';
import { requireAdmin } from '@/presentation/middlewares/authMiddleware';

export class UploadRoutes {
    public router: Router;
    private uploadController: UploadController;

    constructor() {
        this.router = Router();
        this.uploadController = new UploadController();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            '/presigned-url',
            requireAdmin,
            this.uploadController.getPresignedUrl.bind(this.uploadController)
        );
    }
}
