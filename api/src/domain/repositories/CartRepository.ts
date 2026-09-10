import { Cart } from '../entities/cart';
import { Result } from '../../core/logic/Result';

export interface CartRepository {
    create(cart: Cart): Promise<Result<Cart>>;

    findById(id: number): Promise<Result<Cart>>;

    findActiveByGuestId(guestId: string): Promise<Result<Cart>>;

    findActiveByUserId(userId: number): Promise<Result<Cart>>;

    update(cart: Cart): Promise<Result<Cart>>;
}
