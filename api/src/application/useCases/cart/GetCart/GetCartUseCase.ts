import { UseCase } from '@/core/logic/UseCase';
import { Result } from '@/core/logic/Result';
import { Cart } from '@/domain/entities/cart';
import { CartRepository } from '@/domain/repositories/CartRepository';

import { GetCartRequestDto } from './GetCartRequestDto';

type Response = Result<Cart>;

export class GetCart implements UseCase<GetCartRequestDto, Response> {
    constructor(private readonly cartRepository: CartRepository) {}

    public async execute(request: GetCartRequestDto): Promise<Response> {
        if (request.userId !== undefined) {
            return this.cartRepository.findActiveByUserId(request.userId);
        }

        if (request.guestId) {
            return this.cartRepository.findActiveByGuestId(request.guestId);
        }

        return Result.fail<Cart>('User id or guest id is required');
    }
}
