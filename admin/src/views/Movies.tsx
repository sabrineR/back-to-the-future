import { useEffect, useState } from "react";

import MovieTable from "../components/Movie/MovieTable";
import MovieForm from "../components/Movie/MovieForm";
import DeleteMovieModal from "../components/Movie/DeleteMovieModal";

import {
  createMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../services/movieService";

import type { Movie, MovieInput } from "../types/movie";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Une erreur est survenue",
        );
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const refreshMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  const handleAdd = () => {
    setSelectedMovie(null);
    setFormOpen(true);
  };

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedMovie(null);
  };

  const handleSave = async (data: MovieInput) => {
    try {
      setError(null);

      if (selectedMovie) {
        await updateMovie(selectedMovie.id, data);
      } else {
        await createMovie(data);
      }

      await refreshMovies();

      // Close the modal after a successful create or update
      handleCloseForm();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );

      // Re-throw the error so MovieForm can display it too
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!movieToDelete) {
      return;
    }

    try {
      setDeleting(true);
      setError(null);

      await deleteMovie(movieToDelete.id);

      await refreshMovies();

      setMovieToDelete(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Films</h1>

          <p className="mt-1 text-sm text-slate-500">
            Gérez les films disponibles dans la boutique.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Ajouter un film
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          Chargement des films...
        </div>
      ) : (
        <MovieTable
          movies={movies}
          onEdit={handleEdit}
          onDelete={setMovieToDelete}
        />
      )}

      {formOpen && (
        <MovieForm
          movie={selectedMovie}
          onClose={handleCloseForm}
          onSubmit={handleSave}
        />
      )}

      {movieToDelete && (
        <DeleteMovieModal
          movie={movieToDelete}
          loading={deleting}
          onClose={() => setMovieToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Movies;
