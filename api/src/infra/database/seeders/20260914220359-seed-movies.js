'use strict';

module.exports = {
    async up(queryInterface) {
        const movies = [
            {
                title: 'Back to the Future 1',
                price: 15,
                franchise: 'Back to the Future',
                imageUrl:
                    'https://bttf-movies-app-851725244427-eu-west-3-an.s3.eu-west-3.amazonaws.com/movies/07ef3037-8d82-44a5-ac0f-06a806a2f3cf.jpg',
            },
            {
                title: 'Back to the Future 2',
                price: 15,
                franchise: 'Back to the Future',
                imageUrl:
                    'https://bttf-movies-app-851725244427-eu-west-3-an.s3.eu-west-3.amazonaws.com/movies/c25f38b3-6be3-4cf1-a516-46a1c77f8c10.jpg',
            },
            {
                title: 'Back to the Future 3',
                price: 15,
                franchise: 'Back to the Future',
                imageUrl:
                    'https://bttf-movies-app-851725244427-eu-west-3-an.s3.eu-west-3.amazonaws.com/movies/0dac20bc-1d2b-46e9-bcde-93418e0e7146.jfif',
            },
            {
                title: 'La chèvre',
                price: 20,
                franchise: null,
                imageUrl:
                    'https://bttf-movies-app-851725244427-eu-west-3-an.s3.eu-west-3.amazonaws.com/movies/08a3e8a3-43a3-4b1b-9311-eb528dcc6ad5.jpg',
            },
        ];

        for (const movie of movies) {
            const [existingMovies] = await queryInterface.sequelize.query(
                `SELECT id FROM movies WHERE title = :title LIMIT 1;`,
                {
                    replacements: {
                        title: movie.title,
                    },
                }
            );

            if (existingMovies.length === 0) {
                await queryInterface.bulkInsert('movies', [
                    {
                        ...movie,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ]);
            }
        }
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('movies', {
            title: [
                'Back to the Future 1',
                'Back to the Future 2',
                'Back to the Future 3',
                'La chèvre',
            ],
        });
    },
};
