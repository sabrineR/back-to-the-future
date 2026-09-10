import Joi from 'joi';
import { Entity } from '../../core/logic/Entity';
import { Result } from '../../core/logic/Result';

interface MovieProps {
    title: string;
    price: number;
    franchise?: string | null;
    imageUrl?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Movie extends Entity<MovieProps> {
    constructor(props: MovieProps, id?: number) {
        super(props, id);
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this.props.title;
    }

    set title(title: string) {
        this.props.title = title;
    }

    get price(): number {
        return this.props.price;
    }

    set price(price: number) {
        this.props.price = price;
    }

    get franchise(): string | null | undefined {
        return this.props.franchise;
    }

    set franchise(franchise: string | null | undefined) {
        this.props.franchise = franchise;
    }

    get imageUrl(): string | null | undefined {
        return this.props.imageUrl;
    }

    set imageUrl(imageUrl: string | null | undefined) {
        this.props.imageUrl = imageUrl;
    }

    get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }

    public static create(props: MovieProps, id?: number): Result<Movie> {
        const schema = Joi.object().keys({
            title: Joi.string().trim().required(),

            price: Joi.number().positive().required(),

            franchise: Joi.string().allow(null, ''),

            imageUrl: Joi.string().uri().allow(null, ''),

            createdAt: Joi.date().optional(),

            updatedAt: Joi.date().optional(),
        });

        const { error } = schema.validate(props, {
            abortEarly: false,
        });

        if (error) {
            const messages = error.details.map((err) => err.message).join(', ');

            return Result.fail<Movie>(messages);
        }

        return Result.ok<Movie>(
            new Movie(
                {
                    ...props,
                },
                id
            )
        );
    }
}
