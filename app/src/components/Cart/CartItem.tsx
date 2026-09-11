import type { CartItem as CartItemType } from '../../types/cart';
import { formatPrice } from '../../utils/formatPrince';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (movieId: number, quantity: number) => void;
    onRemove: (movieId: number) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
    return (
        <div className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-b-0">
            {item.movie.imageUrl ? (
                <img
                    src={item.movie.imageUrl}
                    alt={item.movie.title}
                    className="h-16 w-12 shrink-0 rounded-md object-cover"
                />
            ) : (
                <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs text-slate-400">
                    DVD
                </div>
            )}

            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-slate-900">
                    {item.movie.title}
                </h3>

                <p className="mt-1 font-semibold text-blue-600">
                    {formatPrice(item.movie.price)}
                </p>
            </div>

            <div className="flex items-center">
                <button
                    type="button"
                    onClick={() =>
                        onUpdateQuantity(item.movie.id, item.quantity - 1)
                    }
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-l-lg border border-slate-300 text-slate-700 transition hover:bg-slate-100"
                >
                    −
                </button>

                <div className="flex h-9 min-w-9 items-center justify-center border-y border-slate-300 px-2 text-sm font-semibold">
                    {item.quantity}
                </div>

                <button
                    type="button"
                    onClick={() =>
                        onUpdateQuantity(item.movie.id, item.quantity + 1)
                    }
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-r-lg border border-slate-300 text-slate-700 transition hover:bg-slate-100"
                >
                    +
                </button>
            </div>

            <button
                type="button"
                title="Supprimer"
                onClick={() => onRemove(item.movie.id)}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
            >
                🗑
            </button>
        </div>
    );
};

export default CartItem;
