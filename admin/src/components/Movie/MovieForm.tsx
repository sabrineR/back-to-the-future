import { useState } from "react";
import type { Movie, MovieInput } from "../../types/movie";
import { uploadFileToS3 } from "../../services/uploadService";

interface MovieFormProps {
  movie?: Movie | null;
  onClose: () => void;
  onSubmit: (data: MovieInput) => Promise<void>;
}

const MovieForm = ({ movie, onClose, onSubmit }: MovieFormProps) => {
  const [title, setTitle] = useState(movie?.title ?? "");
  const [price, setPrice] = useState(movie?.price?.toString() ?? "");
  const [franchise, setFranchise] = useState(movie?.franchise ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageUrl = movie?.imageUrl ?? "";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Le titre est obligatoire");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Le prix doit être supérieur à 0");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let uploadedImageUrl = imageUrl;

      // Upload the new image only when a file has been selected
      if (imageFile) {
        uploadedImageUrl = await uploadFileToS3(imageFile);
      }

      await onSubmit({
        title: title.trim(),
        price: Number(price),
        franchise: franchise || null,
        imageUrl: uploadedImageUrl || null,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {movie ? "Modifier le film" : "Ajouter un film"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-slate-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Titre
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Prix
            </label>

            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="franchise"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Franchise
            </label>

            <select
              id="franchise"
              value={franchise}
              onChange={(event) => setFranchise(event.target.value)}
              className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Aucune franchise</option>
              <option value="Back to the Future">Back to the Future</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="image"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Affiche du film
            </label>

            <input
              id="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  setImageFile(file);
                }
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5"
            />

            {imageFile && (
              <p className="mt-2 text-sm text-slate-500">{imageFile.name}</p>
            )}

            {imageUrl && !imageFile && (
              <img
                src={imageUrl}
                alt={title}
                className="mt-3 h-32 rounded-lg object-cover"
              />
            )}
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Enregistrement..." : movie ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
