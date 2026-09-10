import { Entity } from '@/core/logic/Entity';
import { Result } from '@/core/logic/Result';

interface CartItemProps {
    cartId: number;
    movieId: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export class CartItem extends Entity<CartItemProps> {
    private constructor(props: CartItemProps, id?: number) {
        super(props, id);
    }

    public get id(): number {
        return this._id;
    }

    public get cartId(): number {
        return this.props.cartId;
    }

    public get movieId(): number {
        return this.props.movieId;
    }

    public get quantity(): number {
        return this.props.quantity;
    }

    public get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    public get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }

    public set quantity(value: number) {
        this.props.quantity = value;
    }

    public static create(props: CartItemProps, id?: number): Result<CartItem> {
        if (props.quantity < 1) {
            return Result.fail<CartItem>(
                'Quantity must be greater than or equal to 1'
            );
        }

        const cartItem = new CartItem(props, id);

        return Result.ok<CartItem>(cartItem);
    }
}
