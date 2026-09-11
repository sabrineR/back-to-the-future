import type { Cart as CartType, CartPrice } from '../../types/cart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

interface CartProps {
    cart: CartType | null;
    price: CartPrice | null;
    onUpdateQuantity: (movieId: number, quantity: number) => void;
    onRemove: (movieId: number) => void;
}

const Cart = ({ cart, price, onUpdateQuantity, onRemove }: CartProps) => {
    const itemsCount =
        cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

    return (
        <section className="h-fit rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-950">
                    <span>🛒</span>
                    Mon panier
                </h2>

                <p className="mt-1 text-slate-500">{itemsCount} article(s)</p>
            </div>

            {!cart || cart.items.length === 0 ? (
                <div className="px-6 py-14 text-center">
                    <div className="mb-3 text-4xl">🛒</div>

                    <p className="font-medium text-slate-600">
                        Votre panier est vide
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                        Ajoutez un film pour commencer
                    </p>
                </div>
            ) : (
                <>
                    <div className="px-6">
                        {cart.items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemove={onRemove}
                            />
                        ))}
                    </div>

                    {price && (
                        <div className="px-6 pb-6">
                            <CartSummary price={price} />
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default Cart;
