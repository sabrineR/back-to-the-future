import { Response } from 'express';

import { BaseController } from '@/core/logic/BaseController';
import { HttpRequestDto } from '@/presentation/http/HttpRequest';
import { CreateCart } from '@/application/useCases/cart/CreateCart/CreateCartUseCase';
import { GetCart } from '@/application/useCases/cart/GetCart/GetCartUseCase';
import { CartMap } from '@/domain/mappers/CartMap';
import { GetCartDetails } from '@/application/useCases/cart/GetCartDetails/GetCartDetailsUseCase';
import { CalculateCartPrice } from '@/application/useCases/pricing/CalculateCartPrice/CalculateCartPriceUseCase';

export class CartController extends BaseController {
    constructor(
        private readonly createCart: CreateCart,
        private readonly getCart: GetCart,
        private readonly getCartDetailsUseCase: GetCartDetails,
        private readonly calculateCartPriceUseCase: CalculateCartPrice
    ) {
        super();
    }

    public create = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        try {
            // TODO: After implementing authentication,
            // get userId from req.user.id instead of req.body.
            const result = await this.createCart.execute({
                userId: req.body?.userId,
            });

            if (result.isFailure) {
                return this.fail(res, result.errorValue());
            }

            const cart = result.getValue();

            return this.created(res, CartMap.toDTO(cart));
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };

    public get = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        try {
            // TODO: After implementing authentication:
            // - Get userId from req.user.id when the user is authenticated.
            // - Get guestId from cookies when the user is not authenticated.
            // - Replace the temporary /user/:userId and /guest/:guestId routes
            //   with a single GET /cart route.
            const userId = req.params?.userId
                ? Number(req.params.userId)
                : undefined;

            const guestId = req.params?.guestId;

            if (!userId && !guestId) {
                return this.badRequest(res, 'User id or guest id is required');
            }

            const result = await this.getCart.execute({
                userId,
                guestId,
            });

            if (result.isFailure) {
                return this.notFound(res, result.errorValue());
            }

            const cart = result.getValue();

            return this.ok(res, CartMap.toDTO(cart));
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };

    public getDetails = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        try {
            // TODO: After implementing authentication:
            // - Get userId from req.user.id.
            // - Get guestId from cookies.

            const userId = req.params?.userId
                ? Number(req.params.userId)
                : undefined;

            const guestId = req.params?.guestId;

            if (!userId && !guestId) {
                return this.badRequest(res, 'User id or guest id is required');
            }

            const result = await this.getCartDetailsUseCase.execute({
                userId,
                guestId,
            });

            if (result.isFailure) {
                return this.notFound(res, result.errorValue());
            }

            return this.ok(res, result.getValue());
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };

    public calculatePrice = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        try {
            const cartId = Number(req.params?.cartId);

            if (!cartId || Number.isNaN(cartId)) {
                return this.badRequest(res, 'Valid cart id is required');
            }

            const result = await this.calculateCartPriceUseCase.execute({
                cartId,
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
