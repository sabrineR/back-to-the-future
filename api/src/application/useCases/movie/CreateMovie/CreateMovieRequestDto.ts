export interface CreateMovieRequestDto {
    title: string;
    price: number;
    franchise?: string | null;
    imageUrl?: string | null;
}
