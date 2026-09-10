import { randomUUID } from 'crypto';

import { UseCase } from '@/core/logic/UseCase';
import { Result } from '@/core/logic/Result';
import { Cart } from '@/domain/entities/cart';
import { CartRepository } from '@/domain/repositories/CartRepository';

import { CreateCartRequestDto } from './CreateCartRequestDto';

type Response = Result<Cart>;

export class CreateCart implements UseCase<CreateCartRequestDto, Response> {
    constructor(private readonly cartRepository: CartRepository) {}

    public async execute(request: CreateCartRequestDto): Promise<Response> {
        const guestId = request.userId ? null : randomUUID();

        const cartOrError = Cart.create({
            userId: request.userId ?? null,
            guestId,
            status: 'active',
        });

        if (cartOrError.isFailure) {
            return Result.fail<Cart>(cartOrError.errorValue());
        }

        return this.cartRepository.create(cartOrError.getValue());
    }
}
