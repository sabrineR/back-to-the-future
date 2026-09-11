/* eslint-disable @typescript-eslint/no-require-imports */
'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface) {
        const [existingUsers] = await queryInterface.sequelize.query(
            `SELECT id FROM users WHERE email = 'admin@bttf.com' LIMIT 1;`
        );

        if (existingUsers.length > 0) {
            return;
        }

        const hashedPassword = await bcrypt.hash('Admin123!', 10);

        await queryInterface.bulkInsert('users', [
            {
                fullName: 'BTTF Admin',
                email: 'admin@bttf.com',
                password: hashedPassword,
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('users', {
            email: 'admin@bttf.com',
        });
    },
};
