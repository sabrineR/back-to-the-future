import { CartItem } from '../entities/cartItem';
import { CartItem as CartItemModel } from '../../infra/database/models/cartItem';
import { Result } from '@/core/logic/Result';

export class CartItemMap {
    public static toPersistence(cartItem: CartItem) {
        return {
            cartId: cartItem.cartId,
            movieId: cartItem.movieId,
            quantity: cartItem.quantity,
        };
    }

    public static toDomain(cartItemModel: CartItemModel): Result<CartItem> {
        return CartItem.create(
            {
                cartId: cartItemModel.cartId,
                movieId: cartItemModel.movieId,
                quantity: cartItemModel.quantity,
                createdAt: cartItemModel.createdAt,
                updatedAt: cartItemModel.updatedAt,
            },
            cartItemModel.id
        );
    }

    public static toDTO(cartItem: CartItem) {
        return {
            id: cartItem.id,
            cartId: cartItem.cartId,
            movieId: cartItem.movieId,
            quantity: cartItem.quantity,
            createdAt: cartItem.createdAt,
            updatedAt: cartItem.updatedAt,
        };
    }
}
