import { axiosInstance, handleAxiosError } from "../config/httpCommon";

import type { Movie, MovieInput } from "../types/movie";

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axiosInstance.get<Movie[]>("/movieS");

    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const createMovie = async (movie: MovieInput): Promise<Movie> => {
  try {
    const response = await axiosInstance.post<Movie>("/movies", movie);

    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updateMovie = async (
  id: number,
  movie: MovieInput,
): Promise<Movie> => {
  try {
    const response = await axiosInstance.patch<Movie>(`/movies/${id}`, movie);

    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deleteMovie = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/movies/${id}`);
  } catch (error) {
    return handleAxiosError(error);
  }
};
