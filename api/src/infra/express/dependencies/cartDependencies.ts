import { SequelizeCartRepository } from '@/infra/repositories/SequelizeCartRepository';

import { CreateCart } from '@/application/useCases/cart/CreateCart/CreateCartUseCase';
import { GetCart } from '@/application/useCases/cart/GetCart/GetCartUseCase';

import { CartController } from '@/presentation/controllers/cart/CartController';
import { GetCartDetails } from '@/application/useCases/cart/GetCartDetails/GetCartDetailsUseCase';
import { SequelizeCartItemRepository } from '@/infra/repositories/SequelizeCartItemRepository';
import { SequelizeMovieRepository } from '@/infra/repositories/SequelizeMovieRepository';
import { CalculateCartPrice } from '@/application/useCases/pricing/CalculateCartPrice/CalculateCartPriceUseCase';

const cartRepository = new SequelizeCartRepository();

const cartItemRepository = new SequelizeCartItemRepository();
const movieRepository = new SequelizeMovieRepository();

const createCart = new CreateCart(cartRepository);
const getCart = new GetCart(cartRepository);
const getCartDetails = new GetCartDetails(
    cartRepository,
    cartItemRepository,
    movieRepository
);
const calculateCartPrice = new CalculateCartPrice(
    cartRepository,
    cartItemRepository,
    movieRepository
);

export const cartController = new CartController(
    createCart,
    getCart,
    getCartDetails,
    calculateCartPrice
);
