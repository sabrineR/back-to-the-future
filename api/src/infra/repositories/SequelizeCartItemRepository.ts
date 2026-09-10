import { CartItem as CartItemModel } from '../database/models/cartItem';
import { CartItem } from '../../domain/entities/cartItem';
import { CartItemRepository } from '../../domain/repositories/CartItemRepository';
import { CartItemMap } from '../../domain/mappers/CartItemMap';
import { Result } from '../../core/logic/Result';

export class SequelizeCartItemRepository implements CartItemRepository {
    async create(cartItem: CartItem): Promise<Result<CartItem>> {
        try {
            const rawCartItem = CartItemMap.toPersistence(cartItem);

            const cartItemModel = await CartItemModel.create(rawCartItem);

            return CartItemMap.toDomain(cartItemModel);
        } catch (error) {
            return Result.fail<CartItem>(
                error instanceof Error
                    ? error.message
                    : 'Unable to create cart item'
            );
        }
    }

    async findByCartAndMovie(
        cartId: number,
        movieId: number
    ): Promise<Result<CartItem | null>> {
        try {
            const cartItemModel = await CartItemModel.findOne({
                where: {
                    cartId,
                    movieId,
                },
            });

            if (!cartItemModel) {
                return Result.ok<CartItem | null>(null);
            }

            const cartItemResult = CartItemMap.toDomain(cartItemModel);

            if (cartItemResult.isFailure) {
                return Result.fail<CartItem | null>(
                    cartItemResult.errorValue()
                );
            }

            return Result.ok<CartItem | null>(cartItemResult.getValue());
        } catch (error) {
            return Result.fail<CartItem | null>(
                error instanceof Error
                    ? error.message
                    : 'Unable to retrieve cart item'
            );
        }
    }

    async update(cartItem: CartItem): Promise<Result<CartItem>> {
        try {
            const cartItemModel = await CartItemModel.findByPk(cartItem.id);

            if (!cartItemModel) {
                return Result.fail<CartItem>('Cart item not found');
            }

            const rawCartItem = CartItemMap.toPersistence(cartItem);

            await cartItemModel.update(rawCartItem);

            return CartItemMap.toDomain(cartItemModel);
        } catch (error) {
            return Result.fail<CartItem>(
                error instanceof Error
                    ? error.message
                    : 'Unable to update cart item'
            );
        }
    }

    async delete(id: number): Promise<Result<void>> {
        try {
            const deletedCount = await CartItemModel.destroy({
                where: { id },
            });

            if (deletedCount === 0) {
                return Result.fail<void>('Cart item not found');
            }

            return Result.ok<void>();
        } catch (error) {
            return Result.fail<void>(
                error instanceof Error
                    ? error.message
                    : 'Unable to delete cart item'
            );
        }
    }

    async findByCartId(cartId: number): Promise<Result<CartItem[]>> {
        try {
            const cartItemModels = await CartItemModel.findAll({
                where: {
                    cartId,
                },
            });

            const cartItems: CartItem[] = [];

            for (const cartItemModel of cartItemModels) {
                const cartItemResult = CartItemMap.toDomain(cartItemModel);

                if (cartItemResult.isFailure) {
                    return Result.fail<CartItem[]>(cartItemResult.errorValue());
                }

                cartItems.push(cartItemResult.getValue());
            }

            return Result.ok<CartItem[]>(cartItems);
        } catch (error) {
            return Result.fail<CartItem[]>(
                error instanceof Error
                    ? error.message
                    : 'Unable to retrieve cart items'
            );
        }
    }
}
