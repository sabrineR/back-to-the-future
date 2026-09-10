export interface GetCartDetailsResponseDto {
    id: number;
    userId?: number | null;
    guestId?: string | null;
    status: 'active' | 'abandoned' | 'converted';
    items: {
        id: number;
        quantity: number;
        movie: {
            id: number;
            title: string;
            price: number;
            franchise?: string | null;
            imageUrl?: string | null;
        };
    }[];
}
