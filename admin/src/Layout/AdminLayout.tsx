import { Film, LayoutDashboard } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { logout } from "../services/authService";
import { getCurrentUser } from "../services/authService";

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col bg-slate-950 text-white">
        {/* Logo */}
        <div className="border-b border-slate-800 px-6 py-6">
          <h1 className="text-2xl font-extrabold">
            <span className="text-orange-500">BTTF</span>
          </h1>

          <p className="mt-1 text-xs tracking-[0.25em] text-slate-400">ADMIN</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          <NavLink to="/" end className={linkClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/movies" className={linkClass}>
            <Film size={20} />
            Films
          </NavLink>
        </nav>

        {/* Footer sidebar */}
        <div className="border-t border-slate-800 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div>
            <p className="text-sm text-slate-500">Administration</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {user?.fullName
                ?.split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "A"}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user?.fullName || "Administrateur"}
              </p>

              <p className="text-xs text-slate-500">Administrateur</p>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
