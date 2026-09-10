import { UseCase } from '@/core/logic/UseCase';
import { Result } from '@/core/logic/Result';

import { MovieRepository } from '@/domain/repositories/MovieRepository';

type Response = Result<void>;

export class DeleteMovie implements UseCase<number, Response> {
    constructor(private readonly movieRepository: MovieRepository) {}

    public async execute(id: number): Promise<Response> {
        return this.movieRepository.delete(id);
    }
}
