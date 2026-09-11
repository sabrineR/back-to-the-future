export interface CartMovie {
    id: number;
    title: string;
    price: number;
    franchise?: string | null;
    imageUrl?: string | null;
}

export interface CartItem {
    id: number;
    quantity: number;
    movie: CartMovie;
}

export interface Cart {
    id: number;
    userId?: number | null;
    guestId?: string | null;
    status: 'active' | 'abandoned' | 'converted';
    items: CartItem[];
}

export interface CartPrice {
    subtotal: number;
    discount: number;
    total: number;
}
