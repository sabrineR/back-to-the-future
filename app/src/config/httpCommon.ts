import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const handleAxiosError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.message || err.message);
    } else {
        throw new Error('An unexpected error occurred');
    }
};
