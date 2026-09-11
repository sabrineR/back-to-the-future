import { Response } from 'express';
import { BaseController } from '@/core/logic/BaseController';
import { HttpRequestDto } from '@/presentation/http/HttpRequest';
import { LoginUseCase } from '@/application/useCases/auth/Login/LoginUseCase';

export class AuthController extends BaseController {
    constructor(private readonly loginUseCase: LoginUseCase) {
        super();
    }

    public login = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return this.badRequest(res, 'Email and password are required');
            }

            const result = await this.loginUseCase.execute({
                email,
                password,
            });

            if (result.isFailure) {
                return this.badRequest(res, result.errorValue());
            }

            return this.ok(res, result.getValue());
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };
}
