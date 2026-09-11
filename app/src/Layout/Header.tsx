interface HeaderProps {
    itemsCount: number;
}

const Header = ({ itemsCount }: HeaderProps) => {
    return (
        <header className="border-b border-slate-800 bg-slate-950 text-white shadow-lg">
            <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-6">
                {/* LEFT */}
                <div className="flex h-full items-center gap-14">
                    {/* Logo */}
                    <a href="/" className="flex shrink-0 items-center gap-4">
                        <div className="leading-none">
                            <h1 className="text-xl font-black italic tracking-tighter sm:text-3xl">
                                <span className="bg-gradient-to-b from-orange-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                                    BACK
                                </span>
                            </h1>

                            <div className="-mt-1 flex items-center gap-1">
                                <span className="text-[10px] font-black italic text-orange-500 sm:text-xs">
                                    TO THE
                                </span>

                                <span className="text-sm font-black italic tracking-tighter text-orange-500 sm:text-xl">
                                    FUTURE
                                </span>
                            </div>
                        </div>

                        <div className="hidden h-9 w-px bg-slate-600 sm:block" />

                        <span className="hidden text-sm font-semibold tracking-[0.3em] text-white sm:block">
                            DVD STORE
                        </span>
                    </a>

                    {/* Navigation */}
                    <nav className="hidden h-full items-center md:flex">
                        <a
                            href="/"
                            className="relative flex h-full items-center px-2 font-semibold text-white transition hover:text-blue-400"
                        >
                            Accueil
                            <span className="absolute bottom-5 left-2 right-2 h-0.5 rounded-full bg-blue-500" />
                        </a>
                    </nav>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-6">
                    {/* Cart */}
                    <button
                        type="button"
                        aria-label={`Panier - ${itemsCount} article(s)`}
                        className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg transition hover:bg-slate-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-7 w-7"
                        >
                            <circle cx="9" cy="20" r="1" />

                            <circle cx="19" cy="20" r="1" />

                            <path d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 7H6" />
                        </svg>

                        {itemsCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-400 px-1.5 text-xs font-bold text-slate-950">
                                {itemsCount}
                            </span>
                        )}
                    </button>

                    {/* Separator */}
                    <div className="hidden h-12 w-px bg-slate-700 sm:block" />

                    {/* Guest */}
                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 text-slate-300"
                            >
                                <path d="M20 21a8 8 0 0 0-16 0" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>

                        <span className="font-semibold text-white">Invité</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
