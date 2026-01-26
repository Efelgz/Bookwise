export interface IBook {
    id: string;
    title: string;
    author: string;
    genre: string;
    totalPages: number;
    startDate: string;
    endDate: string;
    coverImageUrl?: string;
}