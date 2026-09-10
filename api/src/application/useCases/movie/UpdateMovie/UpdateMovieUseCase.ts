import { UseCase } from '@/core/logic/UseCase';
import { Result } from '@/core/logic/Result';

import { Movie } from '@/domain/entities/movie';
import { MovieRepository } from '@/domain/repositories/MovieRepository';

import { UpdateMovieRequestDto } from './UpdateMovieRequestDto';

type Response = Result<Movie>;

export class UpdateMovie implements UseCase<UpdateMovieRequestDto, Response> {
    constructor(private readonly movieRepository: MovieRepository) {}

    public async execute(request: UpdateMovieRequestDto): Promise<Response> {
        const { id, title, price, franchise, imageUrl } = request;

        const movieResult = await this.movieRepository.findById(id);

        if (movieResult.isFailure) {
            return Result.fail<Movie>(movieResult.errorValue());
        }

        const movie = movieResult.getValue();

        if (title !== undefined) {
            movie.title = title;
        }

        if (price !== undefined) {
            movie.price = price;
        }

        if (franchise !== undefined) {
            movie.franchise = franchise;
        }

        if (imageUrl !== undefined) {
            movie.imageUrl = imageUrl;
        }

        return this.movieRepository.update(movie);
    }
}
