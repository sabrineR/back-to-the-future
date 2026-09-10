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
        // Create a cart
        this.router.post('/', cartController.create);

        // Get active cart for a guest
        this.router.get('/guest/:guestId', cartController.get);

        // Get active cart for an authenticated user
        // TODO: Remove this route after implementing authentication.
        // userId will be retrieved from req.user.id instead.
        this.router.get('/user/:userId', cartController.get);
        // Add a movie to a cart
        this.router.post('/items', cartItemController.addToCart);
        this.router.patch('/items', cartItemController.updateCartItemQuantity);
        this.router.delete('/items', cartItemController.removeFromCart);
        this.router.get('/guest/:guestId/details', cartController.getDetails);
        this.router.get('/user/:userId/details', cartController.getDetails);
        this.router.get('/:cartId/price', cartController.calculatePrice);
    }
}
