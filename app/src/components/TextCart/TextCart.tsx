import { useState } from 'react';
import type { Movie } from '../../types/movie';

interface CartMovieInput {
    movieId: number;
    quantity: number;
}

interface TextCartProps {
    movies: Movie[];
    onAddMovies: (items: CartMovieInput[]) => Promise<void>;
}

const TextCart = ({ movies, onAddMovies }: TextCartProps) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddMovies = async () => {
        try {
            setLoading(true);
            setError(null);

            const movieNames = text
                .split(/[,\n]/)
                .map((movie) => movie.trim())
                .filter(Boolean);

            if (movieNames.length === 0) {
                setError('Veuillez saisir au moins un film');
                return;
            }

            const movieQuantities = new Map<number, number>();

            for (const movieName of movieNames) {
                const movie = movies.find(
                    (movie) =>
                        movie.title.toLowerCase() === movieName.toLowerCase()
                );

                if (!movie) {
                    setError(`Film introuvable : ${movieName}`);
                    return;
                }

                const currentQuantity = movieQuantities.get(movie.id) ?? 0;

                movieQuantities.set(movie.id, currentQuantity + 1);
            }

            const items = Array.from(movieQuantities.entries()).map(
                ([movieId, quantity]) => ({
                    movieId,
                    quantity,
                })
            );

            await onAddMovies(items);

            setText('');
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Impossible d’ajouter les films au panier'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-950">
                        <span>📝</span>
                        Ajout rapide par texte
                    </h2>

                    <p className="mt-1 text-slate-500">
                        Entrez plusieurs films séparés par une virgule ou un
                        retour à la ligne
                    </p>
                </div>

                <div className="max-w-sm rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
                    ℹ️ Les titres doivent correspondre exactement aux films du
                    catalogue.
                </div>
            </div>

            <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder={`Back to the Future 1
Back to the Future 2
Back to the Future 3
La chèvre
`}
                className="min-h-40 w-full resize-none rounded-xl border border-slate-300 bg-white p-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {error && (
                <div className="mt-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                    type="button"
                    onClick={handleAddMovies}
                    disabled={loading}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span className="text-lg">＋</span>

                    {loading ? 'Ajout en cours...' : 'Ajouter au panier'}
                </button>

                <p className="text-sm text-slate-500">
                    💡 Astuce : vous pouvez séparer les films par une virgule ou
                    un retour à la ligne.
                </p>
            </div>
        </section>
    );
};

export default TextCart;
