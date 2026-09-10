'use strict';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { logger } from '../../shared/utils/logger';

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbPort = Number(process.env.DB_PORT) || 5433;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    define: {
        timestamps: true,
    },

    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
sequelizeConnection
    .authenticate()
    .then(() => {
        logger.info(
            '[PostgreSQL] Connection has been established successfully.'
        );
    })
    .catch((err) => {
        logger.fatal(
            `[PostgreSQL] Unable to connect to the database:${err.message}`
        );
    });
export default sequelizeConnection;
