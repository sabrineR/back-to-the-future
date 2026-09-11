import { useMemo, useState } from 'react';
import type { Movie } from '../../types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
    movies: Movie[];
    onAdd: (movieId: number) => void;
}

const MovieList = ({ movies, onAdd }: MovieListProps) => {
    const [search, setSearch] = useState('');

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [movies, search]);

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-950">
                        <span>🎞️</span>
                        Films disponibles
                    </h2>

                    <p className="mt-1 text-slate-500">
                        Découvrez notre sélection de DVD
                    </p>
                </div>

                <div className="relative w-full md:w-72">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        🔍
                    </span>

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Rechercher un film..."
                        className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onAdd={onAdd} />
                ))}
            </div>

            {filteredMovies.length === 0 && (
                <p className="py-10 text-center text-slate-400">
                    Aucun film trouvé
                </p>
            )}
        </section>
    );
};

export default MovieList;
