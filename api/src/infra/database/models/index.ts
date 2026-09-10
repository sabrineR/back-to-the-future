'use strict';

import { Sequelize } from 'sequelize';
import sequelizeConnection from '../db';
import { User } from './user';
import { Cart } from './cart';
import { Movie } from './movie';
import { CartItem } from './cartItem';

const models: any = {
    User,
    Cart,
    Movie,
    CartItem,
};

for (const model of Object.keys(models)) {
    if (typeof models[model].associate === 'function') {
        models[model].associate(models);
    }
}

models.sequelize = sequelizeConnection;
models.Sequelize = Sequelize;

export default models;
