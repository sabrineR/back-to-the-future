import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

const region = process.env.AWS_REGION as string;
const bucketName = process.env.AWS_S3_BUCKET_NAME as string;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export class S3Service {
    public static async generatePresignedUploadUrl(
        fileName: string,
        contentType: string
    ) {
        const extension = fileName.split('.').pop();

        const key = `movies/${crypto.randomUUID()}.${extension}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: contentType,
        });

        const uploadUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 300,
        });

        const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

        return {
            uploadUrl,
            imageUrl,
        };
    }
}
