export interface UpdateMovieRequestDto {
    id: number;
    title?: string;
    price?: number;
    franchise?: string | null;
    imageUrl?: string | null;
}
