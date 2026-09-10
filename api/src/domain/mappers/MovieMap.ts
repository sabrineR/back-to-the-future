import { Movie } from '../entities/movie';
import { Movie as MovieModel } from '../../infra/database/models/movie';
import { Result } from '@/core/logic/Result';

export class MovieMap {
    public static toPersistence(movie: Movie) {
        return {
            title: movie.title,
            price: movie.price,
            franchise: movie.franchise,
            imageUrl: movie.imageUrl,
        };
    }

    public static toDomain(movieModel: MovieModel): Result<Movie> {
        return Movie.create(
            {
                title: movieModel.title,
                price: Number(movieModel.price),
                franchise: movieModel.franchise,
                imageUrl: movieModel.imageUrl,
                createdAt: movieModel.createdAt,
                updatedAt: movieModel.updatedAt,
            },
            movieModel.id
        );
    }

    public static toDTO(movie: Movie) {
        return {
            id: movie.id,
            title: movie.title,
            price: movie.price,
            franchise: movie.franchise,
            imageUrl: movie.imageUrl,
            createdAt: movie.createdAt,
            updatedAt: movie.updatedAt,
        };
    }
}
