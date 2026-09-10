import { Response } from 'express';

import { BaseController } from '@/core/logic/BaseController';
import { HttpRequestDto } from '@/presentation/http/HttpRequest';
import { CartItemMap } from '@/domain/mappers/CartItemMap';
import { AddToCart } from '@/application/useCases/CartItem/AddToCart/AddToCartUseCase';
import { UpdateCartItemQuantity } from '@/application/useCases/CartItem/UpdateCartItemQuantit/UpdateCartItemQuantityUseCase';
import { RemoveFromCart } from '@/application/useCases/CartItem/RemoveFromCart/RemoveFromCartUseCase';

export class CartItemController extends BaseController {
    constructor(
        private readonly addToCartUseCase: AddToCart,
        private readonly updateCartItemQuantityUseCase: UpdateCartItemQuantity,
        private readonly removeFromCartUseCase: RemoveFromCart
    ) {
        super();
    }

    public addToCart = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        try {
            const { cartId, movieId, quantity } = req.body;

            if (!cartId || !movieId) {
                return this.badRequest(
                    res,
                    'Cart id and movie id are required'
                );
            }

            const result = await this.addToCartUseCase.execute({
                cartId: Number(cartId),
                movieId: Number(movieId),
                quantity: quantity !== undefined ? Number(quantity) : undefined,
            });

            if (result.isFailure) {
                return this.badRequest(res, result.errorValue());
            }

            return this.ok(res, CartItemMap.toDTO(result.getValue()));
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };

    public updateCartItemQuantity = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        try {
            const { cartId, movieId, quantity } = req.body;

            if (!cartId || !movieId || quantity === undefined) {
                return this.badRequest(
                    res,
                    'Cart id, movie id and quantity are required'
                );
            }

            const result = await this.updateCartItemQuantityUseCase.execute({
                cartId: Number(cartId),
                movieId: Number(movieId),
                quantity: Number(quantity),
            });

            if (result.isFailure) {
                return this.badRequest(res, result.errorValue());
            }

            return this.updated(res, CartItemMap.toDTO(result.getValue()));
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };

    public removeFromCart = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        try {
            const { cartId, movieId } = req.body;

            if (!cartId || !movieId) {
                return this.badRequest(
                    res,
                    'Cart id and movie id are required'
                );
            }

            const result = await this.removeFromCartUseCase.execute({
                cartId: Number(cartId),
                movieId: Number(movieId),
            });

            if (result.isFailure) {
                return this.badRequest(res, result.errorValue());
            }

            return this.deleted(res);
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };
}
