import { AlertTriangle, X } from "lucide-react";

import type { Movie } from "../../types/movie";

interface DeleteMovieModalProps {
  movie: Movie;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteMovieModal = ({
  movie,
  loading,
  onClose,
  onConfirm,
}: DeleteMovieModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-950">
            Supprimer le film
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Fermer"
            className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertTriangle size={24} />
          </div>

          <p className="text-slate-600">
            Voulez-vous vraiment supprimer{" "}
            <strong className="text-slate-900">{movie.title}</strong> ?
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Cette action est irréversible.
          </p>

          <div className="mt-7 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-50"
            >
              Annuler
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="cursor-pointer rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Suppression..." : "Supprimer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovieModal;
