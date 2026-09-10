import { Cart as CartModel } from '../database/models/cart';
import { Cart } from '../../domain/entities/cart';
import { CartRepository } from '../../domain/repositories/CartRepository';
import { CartMap } from '../../domain/mappers/CartMap';
import { Result } from '../../core/logic/Result';

export class SequelizeCartRepository implements CartRepository {
    async create(cart: Cart): Promise<Result<Cart>> {
        try {
            const rawCart = CartMap.toPersistence(cart);

            const cartModel = await CartModel.create(rawCart);

            return CartMap.toDomain(cartModel);
        } catch (error) {
            return Result.fail<Cart>(
                error instanceof Error ? error.message : 'Unable to create cart'
            );
        }
    }

    async findById(id: number): Promise<Result<Cart>> {
        try {
            const cartModel = await CartModel.findByPk(id);

            if (!cartModel) {
                return Result.fail<Cart>('Cart not found');
            }

            return CartMap.toDomain(cartModel);
        } catch (error) {
            return Result.fail<Cart>(
                error instanceof Error
                    ? error.message
                    : 'Unable to retrieve cart'
            );
        }
    }

    async findActiveByGuestId(guestId: string): Promise<Result<Cart>> {
        try {
            const cartModel = await CartModel.findOne({
                where: {
                    guestId,
                    status: 'active',
                },
            });

            if (!cartModel) {
                return Result.fail<Cart>('Active cart not found');
            }

            return CartMap.toDomain(cartModel);
        } catch (error) {
            return Result.fail<Cart>(
                error instanceof Error
                    ? error.message
                    : 'Unable to retrieve guest cart'
            );
        }
    }

    async findActiveByUserId(userId: number): Promise<Result<Cart>> {
        try {
            const cartModel = await CartModel.findOne({
                where: {
                    userId,
                    status: 'active',
                },
            });

            if (!cartModel) {
                return Result.fail<Cart>('Active cart not found');
            }

            return CartMap.toDomain(cartModel);
        } catch (error) {
            return Result.fail<Cart>(
                error instanceof Error
                    ? error.message
                    : 'Unable to retrieve user cart'
            );
        }
    }

    async update(cart: Cart): Promise<Result<Cart>> {
        try {
            const cartModel = await CartModel.findByPk(cart.id);

            if (!cartModel) {
                return Result.fail<Cart>('Cart not found');
            }

            await cartModel.update(CartMap.toPersistence(cart));

            return CartMap.toDomain(cartModel);
        } catch (error) {
            return Result.fail<Cart>(
                error instanceof Error ? error.message : 'Unable to update cart'
            );
        }
    }
}
