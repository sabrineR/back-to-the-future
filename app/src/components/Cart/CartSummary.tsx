import { useNavigate } from 'react-router-dom';

import type { CartPrice } from '../../types/cart';
import { formatPrice } from '../../utils/formatPrince';

interface CartSummaryProps {
    price: CartPrice;
}

const CartSummary = ({ price }: CartSummaryProps) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/auth');
    };

    return (
        <div className="border-t border-slate-200 pt-5">
            <div className="flex justify-between py-1.5 text-slate-600">
                <span>Sous-total</span>

                <span className="font-semibold text-slate-900">
                    <span className="font-semibold text-slate-900">
                        {formatPrice(price.subtotal)}
                    </span>
                </span>
            </div>

            <div className="flex justify-between py-1.5 text-green-600">
                <span>Réduction</span>

                <span className="font-semibold">
                    -{formatPrice(price.discount)}
                </span>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-blue-50 p-4">
                <span className="text-lg font-bold text-slate-950">Total</span>

                <span className="text-2xl font-extrabold text-slate-950">
                    {formatPrice(price.total)}
                </span>
            </div>

            <button
                type="button"
                onClick={handleCheckout}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
            >
                Passer la commande
                <span>→</span>
            </button>
        </div>
    );
};

export default CartSummary;
