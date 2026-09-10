import { CartItem } from '../entities/cartItem';
import { Result } from '@/core/logic/Result';

export interface CartItemRepository {
    create(cartItem: CartItem): Promise<Result<CartItem>>;

    findByCartAndMovie(
        cartId: number,
        movieId: number
    ): Promise<Result<CartItem | null>>;

    update(cartItem: CartItem): Promise<Result<CartItem>>;

    delete(id: number): Promise<Result<void>>;
    findByCartId(cartId: number): Promise<Result<CartItem[]>>;
}
