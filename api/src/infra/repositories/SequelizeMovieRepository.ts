import { Movie as MovieModel } from '../database/models/movie';
import { Movie } from '../../domain/entities/movie';
import { MovieRepository } from '../../domain/repositories/MovieRepository';
import { MovieMap } from '../../domain/mappers/MovieMap';
import { Result } from '../../core/logic/Result';

export class SequelizeMovieRepository implements MovieRepository {
    async create(movie: Movie): Promise<Result<Movie>> {
        try {
            const rawMovie = MovieMap.toPersistence(movie);

            const movieModel = await MovieModel.create(rawMovie);

            return MovieMap.toDomain(movieModel);
        } catch (error) {
            return Result.fail<Movie>(
                error instanceof Error
                    ? error.message
                    : 'Unable to create movie'
            );
        }
    }

    async findAll(): Promise<Result<Movie[]>> {
        try {
            const movieModels = await MovieModel.findAll();

            const movies: Movie[] = [];

            for (const movieModel of movieModels) {
                const result = MovieMap.toDomain(movieModel);

                if (result.isFailure) {
                    return Result.fail<Movie[]>(result.errorValue());
                }

                movies.push(result.getValue());
            }

            return Result.ok<Movie[]>(movies);
        } catch (error) {
            return Result.fail<Movie[]>(
                error instanceof Error
                    ? error.message
                    : 'Unable to retrieve movies'
            );
        }
    }

    async findById(id: number): Promise<Result<Movie>> {
        try {
            const movieModel = await MovieModel.findByPk(id);

            if (!movieModel) {
                return Result.fail<Movie>('Movie not found');
            }

            return MovieMap.toDomain(movieModel);
        } catch (error) {
            return Result.fail<Movie>(
                error instanceof Error
                    ? error.message
                    : 'Unable to retrieve movie'
            );
        }
    }

    async update(movie: Movie): Promise<Result<Movie>> {
        try {
            const movieModel = await MovieModel.findByPk(movie.id);

            if (!movieModel) {
                return Result.fail<Movie>('Movie not found');
            }

            await movieModel.update(MovieMap.toPersistence(movie));

            return MovieMap.toDomain(movieModel);
        } catch (error) {
            return Result.fail<Movie>(
                error instanceof Error
                    ? error.message
                    : 'Unable to update movie'
            );
        }
    }

    async delete(id: number): Promise<Result<void>> {
        try {
            const deletedCount = await MovieModel.destroy({
                where: { id },
            });

            if (deletedCount === 0) {
                return Result.fail<void>('Movie not found');
            }

            return Result.ok<void>();
        } catch (error) {
            return Result.fail<void>(
                error instanceof Error
                    ? error.message
                    : 'Unable to delete movie'
            );
        }
    }
}
