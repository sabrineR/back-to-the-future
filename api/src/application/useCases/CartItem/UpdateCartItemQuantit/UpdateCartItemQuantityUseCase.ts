import { UseCase } from '@/core/logic/UseCase';
import { Result } from '@/core/logic/Result';

import { CartItem } from '@/domain/entities/cartItem';
import { CartItemRepository } from '@/domain/repositories/CartItemRepository';

import { UpdateCartItemQuantityRequestDto } from './UpdateCartItemQuantityRequestDto';

type Response = Result<CartItem>;

export class UpdateCartItemQuantity implements UseCase<
    UpdateCartItemQuantityRequestDto,
    Response
> {
    constructor(private readonly cartItemRepository: CartItemRepository) {}

    public async execute(
        request: UpdateCartItemQuantityRequestDto
    ): Promise<Response> {
        if (request.quantity < 1) {
            return Result.fail<CartItem>(
                'Quantity must be greater than or equal to 1'
            );
        }

        const cartItemResult = await this.cartItemRepository.findByCartAndMovie(
            request.cartId,
            request.movieId
        );

        if (cartItemResult.isFailure) {
            return Result.fail<CartItem>(cartItemResult.errorValue());
        }

        const cartItem = cartItemResult.getValue();

        if (!cartItem) {
            return Result.fail<CartItem>('Cart item not found');
        }

        cartItem.quantity = request.quantity;

        return this.cartItemRepository.update(cartItem);
    }
}
