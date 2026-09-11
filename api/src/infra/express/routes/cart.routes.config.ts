import { Router } from 'express';
import { cartController } from '../dependencies/cartDependencies';
import { cartItemController } from '../dependencies/cartItemDependencies';

export class CartRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.cartRoutes();
    }

    protected cartRoutes(): void {
        // Cart
        this.router.post('/', cartController.create);
        this.router.get('/guest/:guestId', cartController.get);
        this.router.get('/user/:userId', cartController.get);

        // Cart items
        this.router.post('/items', cartItemController.addToCart);
        this.router.patch('/items', cartItemController.updateCartItemQuantity);
        this.router.delete('/items', cartItemController.removeFromCart);

        // Cart details
        this.router.get('/guest/:guestId/details', cartController.getDetails);
        this.router.get('/user/:userId/details', cartController.getDetails);

        // Pricing
        this.router.get('/:cartId/price', cartController.calculatePrice);
    }
}
