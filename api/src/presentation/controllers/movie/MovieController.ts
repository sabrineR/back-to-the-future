import { Response, Request } from 'express';
import { BaseController } from '@/core/logic/BaseController';
import { CreateMovie } from '@/application/useCases/movie/CreateMovie/CreateMovieUseCase';
import { CreateMovieRequestDto } from '@/application/useCases/movie/CreateMovie/CreateMovieRequestDto';
import { MovieMap } from '@/domain/mappers/MovieMap';
import { GetMovies } from '@/application/useCases/movie/GetMovies/GetMoviesUseCase';
import { HttpRequestDto } from '@/presentation/http/HttpRequest';
import { GetMovie } from '@/application/useCases/movie/GetMovieById/GetMovieByIdUseCase';
import { logger } from '@/shared/utils/logger';
import { UpdateMovie } from '@/application/useCases/movie/UpdateMovie/UpdateMovieUseCase';
import { DeleteMovie } from '@/application/useCases/movie/DeleteMovie/DeleteMovieUseCase';

export class MovieController extends BaseController {
    constructor(
        private readonly createMovie: CreateMovie,
        private readonly getMovies: GetMovies,
        private readonly getMovie: GetMovie,
        private readonly updateMovie: UpdateMovie,
        private readonly deleteMovie: DeleteMovie
    ) {
        super();
    }

    public create = async (req: Request, res: Response): Promise<Response> => {
        const dto: CreateMovieRequestDto = {
            title: req.body.title,
            price: req.body.price,
            franchise: req.body.franchise,
            imageUrl: req.body.imageUrl,
        };

        try {
            const result = await this.createMovie.execute(dto);

            if (result.isFailure) {
                return this.fail(res, result.errorValue());
            }
            const movie = result.getValue();
            return this.created(res, MovieMap.toDTO(movie));
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };

    public getAll = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        await logger.info(`Get all movies`);
        try {
            const result = await this.getMovies.execute();

            if (result.isFailure) {
                return this.fail(res, result.errorValue());
            }

            const movies = result.getValue();

            return this.ok(
                res,
                movies.map((movie) => MovieMap.toDTO(movie))
            );
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };

    public getById = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        logger.info(`Get movie by id`);
        try {
            const id = Number(req.params?.id);

            const result = await this.getMovie.execute(id);

            if (result.isFailure) {
                return this.notFound(res, result.errorValue());
            }

            const movie = result.getValue();

            return this.ok(res, MovieMap.toDTO(movie));
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };

    // Update Movie
    public update = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        logger.info('Update movie');

        try {
            const id = Number(req.params?.id);

            const result = await this.updateMovie.execute({
                id,
                title: req.body.title,
                price: req.body.price,
                franchise: req.body.franchise,
                imageUrl: req.body.imageUrl,
            });

            if (result.isFailure) {
                return this.notFound(res, result.errorValue());
            }

            const movie = result.getValue();

            return this.updated(res, MovieMap.toDTO(movie));
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };

    public delete = async (
        req: HttpRequestDto,
        res: Response
    ): Promise<Response> => {
        try {
            const id = Number(req.params?.id);

            const result = await this.deleteMovie.execute(id);

            if (result.isFailure) {
                return this.notFound(res, result.errorValue());
            }

            return this.deleted(res);
        } catch (error) {
            return this.fail(
                res,
                error instanceof Error ? error.message : 'Unexpected error'
            );
        }
    };
}
