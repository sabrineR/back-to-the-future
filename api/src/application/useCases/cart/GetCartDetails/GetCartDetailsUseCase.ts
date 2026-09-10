import { UseCase } from '@/core/logic/UseCase';
import { Result } from '@/core/logic/Result';

import { CartRepository } from '@/domain/repositories/CartRepository';
import { CartItemRepository } from '@/domain/repositories/CartItemRepository';
import { MovieRepository } from '@/domain/repositories/MovieRepository';

import { GetCartDetailsRequestDto } from './GetCartDetailsRequestDto';
import { GetCartDetailsResponseDto } from './GetCartDetailsResponseDto';

type Response = Result<GetCartDetailsResponseDto>;

export class GetCartDetails implements UseCase<
    GetCartDetailsRequestDto,
    Response
> {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly cartItemRepository: CartItemRepository,
        private readonly movieRepository: MovieRepository
    ) {}

    public async execute(request: GetCartDetailsRequestDto): Promise<Response> {
        // 1. Retrieve the active cart
        const cartResult =
            request.userId !== undefined
                ? await this.cartRepository.findActiveByUserId(request.userId)
                : request.guestId
                  ? await this.cartRepository.findActiveByGuestId(
                        request.guestId
                    )
                  : null;

        if (!cartResult) {
            return Result.fail<GetCartDetailsResponseDto>(
                'User id or guest id is required'
            );
        }

        if (cartResult.isFailure) {
            return Result.fail<GetCartDetailsResponseDto>(
                cartResult.errorValue()
            );
        }

        const cart = cartResult.getValue();

        // 2. Retrieve cart items
        const cartItemsResult = await this.cartItemRepository.findByCartId(
            cart.id
        );

        if (cartItemsResult.isFailure) {
            return Result.fail<GetCartDetailsResponseDto>(
                cartItemsResult.errorValue()
            );
        }

        const cartItems = cartItemsResult.getValue();

        // 3. Retrieve movie information for each item
        const items = [];

        for (const cartItem of cartItems) {
            const movieResult = await this.movieRepository.findById(
                cartItem.movieId
            );

            if (movieResult.isFailure) {
                return Result.fail<GetCartDetailsResponseDto>(
                    movieResult.errorValue()
                );
            }

            const movie = movieResult.getValue();

            items.push({
                id: cartItem.id,
                quantity: cartItem.quantity,
                movie: {
                    id: movie.id,
                    title: movie.title,
                    price: movie.price,
                    franchise: movie.franchise,
                    imageUrl: movie.imageUrl,
                },
            });
        }

        // 4. Build the API response
        return Result.ok<GetCartDetailsResponseDto>({
            id: cart.id,
            userId: cart.userId,
            guestId: cart.guestId,
            status: cart.status,
            items,
        });
    }
}
