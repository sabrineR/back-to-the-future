import { Model, DataTypes, Optional } from 'sequelize';
import sequelizeConnection from '../db';
// Definition of the User model attributes
export interface UserAttributes {
    id: number;
    fullName: string;
    email: string;
    password: string;
    role: 'customer' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}

// Some attributes are optional when creating a user
export type UserCreationAttributes = Optional<
    UserAttributes,
    'id' | 'role' | 'createdAt' | 'updatedAt'
>;

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    declare id: number;
    declare fullName: string;
    declare email: string;
    declare password: string;
    declare role: 'customer' | 'admin';
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    // Custom methods and associations can be defined here
    static associate(models: any) {
        User.hasMany(models.Cart, {
            foreignKey: 'userId',
            as: 'carts',
        });
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('customer', 'admin'),
            defaultValue: 'customer',
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize: sequelizeConnection,
        timestamps: true,
    }
);

export { User };
