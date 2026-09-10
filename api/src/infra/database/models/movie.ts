import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../db';

export interface MovieAttributes {
    id: number;
    title: string;
    price: number;
    franchise?: string | null;
    imageUrl?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export type MovieCreationAttributes = Optional<
    MovieAttributes,
    'id' | 'imageUrl' | 'franchise' | 'createdAt' | 'updatedAt'
>;

export class Movie
    extends Model<MovieAttributes, MovieCreationAttributes>
    implements MovieAttributes
{
    declare id: number;
    declare title: string;
    declare price: number;
    declare franchise: string | null;
    declare imageUrl: string | null;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    static associate(models: any) {
        Movie.hasMany(models.CartItem, {
            foreignKey: 'movieId',
            as: 'cartItems',
        });

        Movie.hasMany(models.OrderItem, {
            foreignKey: 'movieId',
            as: 'orderItems',
        });
    }
}

Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        franchise: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'movies',
        sequelize: sequelizeConnection,
        timestamps: true,
    }
);
