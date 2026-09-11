import { Pencil, Trash2 } from "lucide-react";

import type { Movie } from "../../types/movie";

interface MovieTableProps {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (movie: Movie) => void;
}

const MovieTable = ({ movies, onEdit, onDelete }: MovieTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Film
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Franchise
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Prix
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {movies.map((movie) => (
              <tr key={movie.id} className="transition hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {movie.imageUrl ? (
                        <img
                          src={movie.imageUrl}
                          alt={movie.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-slate-400">
                          N/A
                        </div>
                      )}
                    </div>

                    <span className="font-semibold text-slate-900">
                      {movie.title}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {movie.franchise || "—"}
                </td>

                <td className="px-6 py-4 font-semibold text-slate-900">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(movie.price)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      title="Modifier"
                      onClick={() => onEdit(movie)}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      title="Supprimer"
                      onClick={() => onDelete(movie)}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {movies.length === 0 && (
        <div className="py-12 text-center text-slate-500">
          Aucun film dans le catalogue.
        </div>
      )}
    </div>
  );
};

export default MovieTable;
