import { MovieController } from '@/presentation/controllers/movie/MovieController';
import { SequelizeMovieRepository } from '@/infra/repositories/SequelizeMovieRepository';
import { CreateMovie } from '@/application/useCases/movie/CreateMovie/CreateMovieUseCase';
import { GetMovies } from '@/application/useCases/movie/GetMovies/GetMoviesUseCase';
import { UpdateMovie } from '@/application/useCases/movie/UpdateMovie/UpdateMovieUseCase';
import { DeleteMovie } from '@/application/useCases/movie/DeleteMovie/DeleteMovieUseCase';
import { GetMovie } from '@/application/useCases/movie/GetMovieById/GetMovieByIdUseCase';

const movieRepository = new SequelizeMovieRepository();

const createMovie = new CreateMovie(movieRepository);
const getMovies = new GetMovies(movieRepository);
const getMovie = new GetMovie(movieRepository);
const updateMovie = new UpdateMovie(movieRepository);
const deleteMovie = new DeleteMovie(movieRepository);

export const movieController = new MovieController(
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie
);
