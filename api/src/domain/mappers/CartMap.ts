import { Cart } from '../entities/cart';
import { Cart as CartModel } from '../../infra/database/models/cart';
import { Result } from '@/core/logic/Result';

export class CartMap {
    public static toPersistence(cart: Cart) {
        return {
            userId: cart.userId,
            guestId: cart.guestId,
            status: cart.status,
        };
    }

    public static toDomain(cartModel: CartModel): Result<Cart> {
        return Cart.create(
            {
                userId: cartModel.userId,
                guestId: cartModel.guestId,
                status: cartModel.status,
                createdAt: cartModel.createdAt,
                updatedAt: cartModel.updatedAt,
            },
            cartModel.id
        );
    }

    public static toDTO(cart: Cart) {
        return {
            id: cart.id,
            userId: cart.userId,
            guestId: cart.guestId,
            status: cart.status,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
        };
    }
}
