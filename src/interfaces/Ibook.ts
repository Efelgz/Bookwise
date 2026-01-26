export interface IBook {
    id: string;
    title: string;
    author: string;
    year: number;
    genre: string;
    description: string;
    coverImageUrl?: string; 
}