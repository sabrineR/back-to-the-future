import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../db';

export interface CartItemAttributes {
    id: number;
    cartId: number;
    movieId: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export type CartItemCreationAttributes = Optional<
    CartItemAttributes,
    'id' | 'createdAt' | 'updatedAt'
>;

export class CartItem
    extends Model<CartItemAttributes, CartItemCreationAttributes>
    implements CartItemAttributes
{
    declare id: number;
    declare cartId: number;
    declare movieId: number;
    declare quantity: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    static associate(models: any) {
        CartItem.belongsTo(models.Cart, {
            foreignKey: 'cartId',
            as: 'cart',
        });

        CartItem.belongsTo(models.Movie, {
            foreignKey: 'movieId',
            as: 'movie',
        });
    }
}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'carts',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        movieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'movies',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
            },
        },
    },
    {
        tableName: 'cart_items',
        sequelize: sequelizeConnection,
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['cartId', 'movieId'],
                name: 'unique_cart_movie',
            },
        ],
    }
);
