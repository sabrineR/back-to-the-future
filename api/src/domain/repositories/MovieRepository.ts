import { Result } from '@/core/logic/Result';
import { Movie } from '../entities/movie';

export interface MovieRepository {
    create(movie: Movie): Promise<Result<Movie>>;
    findAll(): Promise<Result<Movie[]>>;
    findById(id: number): Promise<Result<Movie>>;
    update(movie: Movie): Promise<Result<Movie>>;
    delete(id: number): Promise<Result<void>>;
}
