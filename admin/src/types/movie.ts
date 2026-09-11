export interface Movie {
  id: number;
  title: string;
  price: number;
  franchise?: string | null;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface MovieInput {
  title: string;
  price: number;
  franchise: string | null;
  imageUrl: string | null;
}
