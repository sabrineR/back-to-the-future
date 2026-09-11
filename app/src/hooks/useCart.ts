import { useEffect, useRef, useState } from 'react';
import {
    addCartItem,
    createCart,
    getCartDetails,
    getCartPrice,
    removeCartItem,
    updateCartItemQuantity,
} from '../services/cart.service';
import type { Cart, CartPrice } from '../types/cart';

const GUEST_ID_KEY = 'guestId';

interface CartMovieInput {
    movieId: number;
    quantity: number;
}

const useCart = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [price, setPrice] = useState<CartPrice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const initialized = useRef(false);

    const refreshCart = async (guestId: string, cartId: number) => {
        const [cartDetails, cartPrice] = await Promise.all([
            getCartDetails(guestId),
            getCartPrice(cartId),
        ]);

        setCart(cartDetails);
        setPrice(cartPrice);
    };

    useEffect(() => {
        if (initialized.current) {
            return;
        }

        initialized.current = true;

        const initializeCart = async () => {
            try {
                setLoading(true);
                setError(null);

                const storedGuestId = localStorage.getItem(GUEST_ID_KEY);

                if (storedGuestId) {
                    const existingCart = await getCartDetails(storedGuestId);

                    await refreshCart(storedGuestId, existingCart.id);

                    return;
                }

                const createdCart = await createCart();

                if (!createdCart.guestId) {
                    throw new Error('Guest ID introuvable');
                }

                localStorage.setItem(GUEST_ID_KEY, createdCart.guestId);

                await refreshCart(createdCart.guestId, createdCart.id);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Une erreur est survenue'
                );
            } finally {
                setLoading(false);
            }
        };

        initializeCart();
    }, []);

    const addToCart = async (movieId: number) => {
        if (!cart || !cart.guestId) {
            return;
        }

        try {
            setError(null);

            await addCartItem(cart.id, movieId, 1);

            await refreshCart(cart.guestId, cart.id);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Impossible d’ajouter le film au panier'
            );
        }
    };

    const addMoviesToCart = async (items: CartMovieInput[]) => {
        if (!cart || !cart.guestId) {
            return;
        }

        try {
            setError(null);

            await Promise.all(
                items.map((item) =>
                    addCartItem(cart.id, item.movieId, item.quantity)
                )
            );

            await refreshCart(cart.guestId, cart.id);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Impossible d’ajouter les films au panier'
            );
        }
    };

    const updateQuantity = async (movieId: number, quantity: number) => {
        if (!cart || !cart.guestId) {
            return;
        }

        try {
            setError(null);

            if (quantity <= 0) {
                await removeCartItem(cart.id, movieId);
            } else {
                await updateCartItemQuantity(cart.id, movieId, quantity);
            }

            await refreshCart(cart.guestId, cart.id);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Impossible de modifier la quantité'
            );
        }
    };

    const removeFromCart = async (movieId: number) => {
        if (!cart || !cart.guestId) {
            return;
        }

        try {
            setError(null);

            await removeCartItem(cart.id, movieId);

            await refreshCart(cart.guestId, cart.id);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Impossible de supprimer le film'
            );
        }
    };

    return {
        cart,
        price,
        loading,
        error,
        addToCart,
        addMoviesToCart,
        updateQuantity,
        removeFromCart,
    };
};

export default useCart;
