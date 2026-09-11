import { axiosInstance, handleAxiosError } from '../config/httpCommon';
import type { Movie } from '../types/movie';

export const getMovies = async (): Promise<Movie[]> => {
    try {
        const response = await axiosInstance.get<Movie[]>('/movies');

        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};
