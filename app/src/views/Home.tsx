import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import Cart from '../components/Cart/Cart';
import MovieList from '../components/Movie/MovieList';
import TextCart from '../components/TextCart/TextCart';

import type useCart from '../hooks/useCart';

type CartContextType = ReturnType<typeof useCart>;
import { getMovies } from '../services/movie.service';

import type { Movie } from '../types/movie';

const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const [loadingMovies, setLoadingMovies] = useState(true);

    const [movieError, setMovieError] = useState<string | null>(null);
    const {
        cart,
        price,
        loading: cartLoading,
        error: cartError,
        addToCart,
        addMoviesToCart,
        updateQuantity,
        removeFromCart,
    } = useOutletContext<CartContextType>();

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoadingMovies(true);
                setMovieError(null);

                const data = await getMovies();

                setMovies(data);
            } catch (error) {
                setMovieError(
                    error instanceof Error
                        ? error.message
                        : 'Impossible de charger les films'
                );
            } finally {
                setLoadingMovies(false);
            }
        };

        loadMovies();
    }, []);

    if (loadingMovies || cartLoading) {
        return (
            <div className="py-10 text-center text-slate-500">
                Chargement...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {movieError && (
                <div className="rounded-lg bg-red-50 p-3 text-red-600">
                    {movieError}
                </div>
            )}

            {cartError && (
                <div className="rounded-lg bg-red-50 p-3 text-red-600">
                    {cartError}
                </div>
            )}

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_1fr]">
                <MovieList movies={movies} onAdd={addToCart} />

                <Cart
                    cart={cart}
                    price={price}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                />
            </div>

            <TextCart movies={movies} onAddMovies={addMoviesToCart} />
        </div>
    );
};

export default Home;
