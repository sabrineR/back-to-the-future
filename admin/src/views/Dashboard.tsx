import { Film } from 'lucide-react';

const Dashboard = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-950">
                    Dashboard
                </h1>

                <p className="mt-1 text-slate-500">
                    Gérez le catalogue de la boutique EKINOX.
                </p>
            </div>

            <div className="max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Film size={24} />
                </div>

                <h2 className="font-semibold text-slate-500">
                    Catalogue
                </h2>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                    Gestion des films
                </p>
            </div>
        </div>
    );
};

export default Dashboard;