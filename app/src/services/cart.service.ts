import { axiosInstance, handleAxiosError } from '../config/httpCommon';
import type { Cart, CartItem, CartPrice } from '../types/cart';

export const createCart = async (): Promise<Cart> => {
    try {
        const response = await axiosInstance.post<Cart>('/carts');
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const getCartDetails = async (guestId: string): Promise<Cart> => {
    try {
        const response = await axiosInstance.get<Cart>(
            `/carts/guest/${guestId}/details`
        );

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const addCartItem = async (
    cartId: number,
    movieId: number,
    quantity = 1
): Promise<CartItem> => {
    try {
        const response = await axiosInstance.post<CartItem>('/carts/items', {
            cartId,
            movieId,
            quantity,
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const updateCartItemQuantity = async (
    cartId: number,
    movieId: number,
    quantity: number
): Promise<CartItem> => {
    try {
        const response = await axiosInstance.patch<CartItem>('/carts/items', {
            cartId,
            movieId,
            quantity,
        });

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const removeCartItem = async (
    cartId: number,
    movieId: number
): Promise<void> => {
    try {
        await axiosInstance.delete('/carts/items', {
            data: {
                cartId,
                movieId,
            },
        });
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const getCartPrice = async (cartId: number): Promise<CartPrice> => {
    try {
        const response = await axiosInstance.get<CartPrice>(
            `/carts/${cartId}/price`
        );

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};
