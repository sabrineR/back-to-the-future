import type { Movie } from '../../types/movie';
import { formatPrice } from '../../utils/formatPrince';

interface MovieCardProps {
    movie: Movie;
    onAdd: (movieId: number) => void;
}

const MovieCard = ({ movie, onAdd }: MovieCardProps) => {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-slate-100">
                {movie.imageUrl ? (
                    <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center px-3 text-center text-sm text-slate-400">
                        Aucune image
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col pt-4">
                <h3 className="min-h-12 text-base font-bold leading-6 text-slate-900">
                    {movie.title}
                </h3>

                <p className="mt-1 text-lg font-bold text-blue-600">
                    {formatPrice(movie.price)}
                </p>

                <button
                    type="button"
                    onClick={() => onAdd(movie.id)}
                    className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                >
                    <span>🛒</span>
                    Ajouter
                </button>
            </div>
        </article>
    );
};

export default MovieCard;
