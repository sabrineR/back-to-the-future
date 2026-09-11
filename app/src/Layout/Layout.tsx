import { Outlet } from 'react-router-dom';

import Header from './Header';
import useCart from '../hooks/useCart';

const Layout = () => {
    const cartData = useCart();

    const itemsCount =
        cartData.cart?.items.reduce(
            (total, item) => total + item.quantity,
            0
        ) ?? 0;

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header itemsCount={itemsCount} />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
                    <Outlet context={cartData} />
                </div>
            </main>

            <footer className="mt-auto border-t border-slate-200 bg-white py-5 text-slate-500">
                <div className="mx-auto max-w-7xl px-6 text-center text-sm">
                    © {new Date().getFullYear()} Back to the Future DVD Store
                </div>
            </footer>
        </div>
    );
};

export default Layout;
