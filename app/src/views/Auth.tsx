import { useState } from 'react';

type AuthMode = 'login' | 'register';

const Auth = () => {
    const [mode, setMode] = useState<AuthMode>('login');

    return (
        <div className="mx-auto max-w-md py-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-7 text-center">
                    <h1 className="text-2xl font-bold text-slate-950">
                        Finaliser votre commande
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Connectez-vous ou créez un compte pour continuer.
                    </p>
                </div>

                <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                    <button
                        type="button"
                        onClick={() => setMode('login')}
                        className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                            mode === 'login'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500'
                        }`}
                    >
                        Se connecter
                    </button>

                    <button
                        type="button"
                        onClick={() => setMode('register')}
                        className={`cursor-pointer rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                            mode === 'register'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500'
                        }`}
                    >
                        Créer un compte
                    </button>
                </div>

                {mode === 'login' ? (
                    <form className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="vous@email.com"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Mot de passe
                            </label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Se connecter
                        </button>
                    </form>
                ) : (
                    <form className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Nom complet
                            </label>

                            <input
                                type="text"
                                placeholder="Votre nom"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="vous@email.com"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Mot de passe
                            </label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Créer mon compte
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Auth;
