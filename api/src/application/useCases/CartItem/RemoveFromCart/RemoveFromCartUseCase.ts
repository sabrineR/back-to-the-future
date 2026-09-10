import { UseCase } from '@/core/logic/UseCase';
import { Result } from '@/core/logic/Result';

import { CartItemRepository } from '@/domain/repositories/CartItemRepository';

import { RemoveFromCartRequestDto } from './RemoveFromCartRequestDto';

type Response = Result<void>;

export class RemoveFromCart implements UseCase<
    RemoveFromCartRequestDto,
    Response
> {
    constructor(private readonly cartItemRepository: CartItemRepository) {}

    public async execute(request: RemoveFromCartRequestDto): Promise<Response> {
        const cartItemResult = await this.cartItemRepository.findByCartAndMovie(
            request.cartId,
            request.movieId
        );

        if (cartItemResult.isFailure) {
            return Result.fail<void>(cartItemResult.errorValue());
        }

        const cartItem = cartItemResult.getValue();

        if (!cartItem) {
            return Result.fail<void>('Cart item not found');
        }

        return this.cartItemRepository.delete(cartItem.id);
    }
}
