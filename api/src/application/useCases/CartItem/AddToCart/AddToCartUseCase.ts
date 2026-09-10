import { UseCase } from '@/core/logic/UseCase';
import { Result } from '@/core/logic/Result';

import { CartItem } from '@/domain/entities/cartItem';
import { CartRepository } from '@/domain/repositories/CartRepository';
import { MovieRepository } from '@/domain/repositories/MovieRepository';
import { CartItemRepository } from '@/domain/repositories/CartItemRepository';

import { AddToCartRequestDto } from './AddToCartRequestDto';

type Response = Result<CartItem>;

export class AddToCart implements UseCase<AddToCartRequestDto, Response> {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly movieRepository: MovieRepository,
        private readonly cartItemRepository: CartItemRepository
    ) {}

    public async execute(request: AddToCartRequestDto): Promise<Response> {
        const quantity = request.quantity ?? 1;

        // 1. Validate quantity
        if (quantity < 1) {
            return Result.fail<CartItem>(
                'Quantity must be greater than or equal to 1'
            );
        }

        // 2. Check that the cart exists
        const cartResult = await this.cartRepository.findById(request.cartId);

        if (cartResult.isFailure) {
            return Result.fail<CartItem>('Cart not found');
        }

        const cart = cartResult.getValue();

        // 3. Check that the cart is active
        if (cart.status !== 'active') {
            return Result.fail<CartItem>('Cart is not active');
        }

        // 4. Check that the movie exists
        const movieResult = await this.movieRepository.findById(
            request.movieId
        );

        if (movieResult.isFailure) {
            return Result.fail<CartItem>('Movie not found');
        }

        // 5. Check whether the movie is already in the cart
        const existingItemResult =
            await this.cartItemRepository.findByCartAndMovie(
                request.cartId,
                request.movieId
            );

        if (existingItemResult.isFailure) {
            return Result.fail<CartItem>(existingItemResult.errorValue());
        }

        const existingItem = existingItemResult.getValue();

        // 6. If it already exists, increment quantity
        if (existingItem) {
            existingItem.quantity += quantity;

            return this.cartItemRepository.update(existingItem);
        }

        // 7. Otherwise create a new CartItem
        const cartItemResult = CartItem.create({
            cartId: request.cartId,
            movieId: request.movieId,
            quantity,
        });

        if (cartItemResult.isFailure) {
            return Result.fail<CartItem>(cartItemResult.errorValue());
        }

        // 8. Save the new CartItem
        return this.cartItemRepository.create(cartItemResult.getValue());
    }
}
