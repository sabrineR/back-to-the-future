import { UseCase } from '@/core/logic/UseCase';
import { Result } from '@/core/logic/Result';

import { Movie } from '@/domain/entities/movie';
import { MovieRepository } from '@/domain/repositories/MovieRepository';

type Response = Result<Movie[]>;

export class GetMovies implements UseCase<void, Response> {
    constructor(private readonly movieRepository: MovieRepository) {}

    public async execute(): Promise<Response> {
        return this.movieRepository.findAll();
    }
}
