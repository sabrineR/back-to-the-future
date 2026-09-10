import { SequelizeCartRepository } from '@/infra/repositories/SequelizeCartRepository';
import { SequelizeMovieRepository } from '@/infra/repositories/SequelizeMovieRepository';
import { SequelizeCartItemRepository } from '@/infra/repositories/SequelizeCartItemRepository';
import { AddToCart } from '@/application/useCases/CartItem/AddToCart/AddToCartUseCase';

import { CartItemController } from '@/presentation/controllers/cartItem/CartItemController';
import { UpdateCartItemQuantity } from '@/application/useCases/CartItem/UpdateCartItemQuantit/UpdateCartItemQuantityUseCase';
import { RemoveFromCart } from '@/application/useCases/CartItem/RemoveFromCart/RemoveFromCartUseCase';

const cartRepository = new SequelizeCartRepository();
const movieRepository = new SequelizeMovieRepository();
const cartItemRepository = new SequelizeCartItemRepository();

const addToCart = new AddToCart(
    cartRepository,
    movieRepository,
    cartItemRepository
);
const removeFromCart = new RemoveFromCart(cartItemRepository);
const updateCartItemQuantity = new UpdateCartItemQuantity(cartItemRepository);

export const cartItemController = new CartItemController(
    addToCart,
    updateCartItemQuantity,
    removeFromCart
);
