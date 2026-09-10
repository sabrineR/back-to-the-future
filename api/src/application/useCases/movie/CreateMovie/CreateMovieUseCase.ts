import { UseCase } from '../../../../core/logic/UseCase';
import { Result } from '../../../../core/logic/Result';
import { Movie } from '../../../../domain/entities/movie';
import { MovieRepository } from '@/domain/repositories/MovieRepository';
import { CreateMovieRequestDto } from './CreateMovieRequestDto';

type Response = Result<Movie>;

export class CreateMovie implements UseCase<
    CreateMovieRequestDto,
    Promise<Response>
> {
    constructor(private readonly movieRepository: MovieRepository) {}

    async execute(request: CreateMovieRequestDto): Promise<Result<Movie>> {
        const movieOrError = Movie.create({
            title: request.title,
            price: request.price,
            franchise: request.franchise,
            imageUrl: request.imageUrl,
        });

        if (movieOrError.isFailure) {
            return Result.fail<Movie>(movieOrError.errorValue());
        }

        return this.movieRepository.create(movieOrError.getValue());
    }
}
