import Joi from 'joi';
import { Entity } from '../../core/logic/Entity';
import { Result } from '../../core/logic/Result';

interface UserProps {
    fullName: string;
    email: string;
    password: string;
    role: 'customer' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}

export class User extends Entity<UserProps> {
    constructor(props: UserProps, id?: number) {
        super(props, id);
    }

    get id(): number {
        return this._id;
    }

    get fullName(): string {
        return this.props.fullName;
    }

    set fullName(fullName: string) {
        this.props.fullName = fullName;
    }

    get email(): string {
        return this.props.email;
    }

    set email(email: string) {
        this.props.email = email;
    }

    get password(): string {
        return this.props.password;
    }

    set password(password: string) {
        this.props.password = password;
    }

    get role(): 'customer' | 'admin' {
        return this.props.role;
    }

    set role(role: 'customer' | 'admin') {
        this.props.role = role;
    }

    get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }

    public static create(props: UserProps, id?: number): Result<User> {
        const schema = Joi.object().keys({
            fullName: Joi.string().trim().min(2).required(),

            email: Joi.string().trim().lowercase().email().required(),

            password: Joi.string().required(),

            role: Joi.string().valid('customer', 'admin').required(),

            createdAt: Joi.date().optional(),

            updatedAt: Joi.date().optional(),
        });

        const { error, value } = schema.validate(props, {
            abortEarly: false,
        });

        if (error) {
            const messages = error.details.map((err) => err.message).join(', ');

            return Result.fail<User>(messages);
        }

        return Result.ok<User>(
            new User(
                {
                    ...value,
                },
                id
            )
        );
    }
}
