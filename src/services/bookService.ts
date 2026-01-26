import type { IBook } from "../interfaces/IBook";
import { v4 as uuidv4 } from 'uuid';

export const getBooks = (): IBook[] =>{
    const books = localStorage.getItem("books");
    return books ? JSON.parse(books) : [];
};

export const addBook = (book: Omit<IBook, "id">): IBook =>{
    const books = getBooks();
    const newBook: IBook ={
        ...book,
        id: uuidv4()
    };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    return newBook;
};
export const deleteBook = (id: string): void =>{
    const books = getBooks();
    const filtered = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(filtered));
};
export const updateBook = (id: string, updatedBook: Omit<IBook, 'id'>): IBook | null =>{
    const books = getBooks();
    const index = books.findIndex(book => book.id ===id);
    if(index === -1) return null;

    books[index] ={...updatedBook, id};
    localStorage.setItem('books',JSON.stringify(books));
    return books[index];
};
export const getBookById = (id: string): IBook | undefined =>{
    const books = getBooks();
    return books.find(book => book.id === id);
};