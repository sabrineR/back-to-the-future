import { UseCase } from '@/core/logic/UseCase';
import { Result } from '@/core/logic/Result';

import { Movie } from '@/domain/entities/movie';
import { CartRepository } from '@/domain/repositories/CartRepository';
import { CartItemRepository } from '@/domain/repositories/CartItemRepository';
import { MovieRepository } from '@/domain/repositories/MovieRepository';
import { PricingService } from '@/shared/services/PricingService';

import { CalculateCartPriceRequestDto } from './CalculateCartPriceRequestDto';
import { CalculateCartPriceResponseDto } from './CalculateCartPriceResponseDto';

type Response = Result<CalculateCartPriceResponseDto>;

export class CalculateCartPrice implements UseCase<
    CalculateCartPriceRequestDto,
    Response
> {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly cartItemRepository: CartItemRepository,
        private readonly movieRepository: MovieRepository
    ) {}

    public async execute(
        request: CalculateCartPriceRequestDto
    ): Promise<Response> {
        // Check that the cart exists
        const cartResult = await this.cartRepository.findById(request.cartId);

        if (cartResult.isFailure) {
            return Result.fail<CalculateCartPriceResponseDto>('Cart not found');
        }

        const cart = cartResult.getValue();

        if (cart.status !== 'active') {
            return Result.fail<CalculateCartPriceResponseDto>(
                'Cart is not active'
            );
        }

        // Retrieve cart items
        const cartItemsResult = await this.cartItemRepository.findByCartId(
            cart.id
        );

        if (cartItemsResult.isFailure) {
            return Result.fail<CalculateCartPriceResponseDto>(
                cartItemsResult.errorValue()
            );
        }

        const cartItems = cartItemsResult.getValue();

        // Empty cart
        if (cartItems.length === 0) {
            return Result.ok<CalculateCartPriceResponseDto>({
                subtotal: 0,
                discount: 0,
                total: 0,
            });
        }

        const movies: Movie[] = [];

        // Retrieve movies and take quantities into account
        for (const cartItem of cartItems) {
            const movieResult = await this.movieRepository.findById(
                cartItem.movieId
            );

            if (movieResult.isFailure) {
                return Result.fail<CalculateCartPriceResponseDto>(
                    movieResult.errorValue()
                );
            }

            const movie = movieResult.getValue();

            for (let i = 0; i < cartItem.quantity; i++) {
                movies.push(movie);
            }
        }

        // Price before discount
        const subtotal = movies.reduce(
            (total, movie) => total + movie.price,
            0
        );

        // Price after BTTF promotion
        const total = PricingService.calculate(movies);

        const discount = subtotal - total;

        return Result.ok<CalculateCartPriceResponseDto>({
            subtotal,
            discount,
            total,
        });
    }
}
