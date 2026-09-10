import { Movie } from '@/domain/entities/movie';

export class PricingService {
    public static calculate(movies: Movie[]): number {
        const bttfMovies = movies.filter(
            (movie) => movie.franchise === 'Back to the Future'
        );

        const otherMovies = movies.filter(
            (movie) => movie.franchise !== 'Back to the Future'
        );

        const distinctBttfMoviesCount = new Set(
            bttfMovies.map((movie) => movie.title)
        ).size;

        const discount = this.getBttfDiscount(distinctBttfMoviesCount);

        const bttfTotal = bttfMovies.reduce(
            (total, movie) => total + movie.price,
            0
        );

        const discountedBttfTotal = bttfTotal * (1 - discount);

        const otherMoviesTotal = otherMovies.reduce(
            (total, movie) => total + movie.price,
            0
        );

        return discountedBttfTotal + otherMoviesTotal;
    }

    private static getBttfDiscount(distinctBttfMoviesCount: number): number {
        if (distinctBttfMoviesCount >= 3) {
            return 0.2;
        }

        if (distinctBttfMoviesCount >= 2) {
            return 0.1;
        }

        return 0;
    }
}
