import { Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from '../db';

export interface CartAttributes {
    id: number;
    userId?: number | null;
    guestId?: string | null;
    status: 'active' | 'abandoned' | 'converted';
    createdAt?: Date;
    updatedAt?: Date;
}
export type CartCreationAttributes = Optional<
    CartAttributes,
    'id' | 'userId' | 'guestId' | 'status' | 'createdAt' | 'updatedAt'
>;

export class Cart
    extends Model<CartAttributes, CartCreationAttributes>
    implements CartAttributes
{
    declare id: number;
    declare userId: number | null;
    declare guestId: string | null;
    declare status: 'active' | 'abandoned' | 'converted';
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    // Custom methods and associations can be defined here
    static associate(models: any) {
        Cart.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });

        Cart.hasMany(models.CartItem, {
            foreignKey: 'cartId',
            as: 'items',
        });
    }
}
Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },

        guestId: {
            type: DataTypes.UUID,
            allowNull: true,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'abandoned', 'converted'),
            allowNull: false,
            defaultValue: 'active',
        },
    },
    {
        tableName: 'carts',
        sequelize: sequelizeConnection,
        timestamps: true,
    }
);
