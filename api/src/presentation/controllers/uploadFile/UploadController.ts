import { Request, Response } from 'express';
import { BaseController } from '@/core/logic/BaseController';
import { S3Service } from '@/infra/aws/S3Service';

export class UploadController extends BaseController {
    public async getPresignedUrl(req: Request, res: Response) {
        try {
            const { fileName, contentType } = req.body;

            if (!fileName || !contentType) {
                return this.badRequest(
                    res,
                    'fileName and contentType are required'
                );
            }

            const result = await S3Service.generatePresignedUploadUrl(
                fileName,
                contentType
            );

            return this.ok(res, result);
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error
                    ? error
                    : 'Unable to generate presigned URL'
            );
        }
    }
}
