import { Entity } from '@/core/logic/Entity';
import { Result } from '@/core/logic/Result';

interface CartProps {
    userId?: number | null;
    guestId?: string | null;
    status: 'active' | 'abandoned' | 'converted';
    createdAt?: Date;
    updatedAt?: Date;
}

export class Cart extends Entity<CartProps> {
    private constructor(props: CartProps, id?: number) {
        super(props, id);
    }

    public get id(): number {
        return this._id;
    }

    public get userId(): number | null | undefined {
        return this.props.userId;
    }

    public get guestId(): string | null | undefined {
        return this.props.guestId;
    }

    public get status(): 'active' | 'abandoned' | 'converted' {
        return this.props.status;
    }

    public get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    public get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }

    public set userId(value: number | null | undefined) {
        this.props.userId = value;
    }

    public set guestId(value: string | null | undefined) {
        this.props.guestId = value;
    }

    public set status(value: 'active' | 'abandoned' | 'converted') {
        this.props.status = value;
    }

    public static create(props: CartProps, id?: number): Result<Cart> {
        if (!props.userId && !props.guestId) {
            return Result.fail<Cart>(
                'Cart must have either a userId or a guestId'
            );
        }

        const cart = new Cart(
            {
                ...props,
                status: props.status ?? 'active',
            },
            id
        );

        return Result.ok<Cart>(cart);
    }
}
