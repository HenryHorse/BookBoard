import { Book, Author, Genre, Year } from "server/models";

export interface Model {
    book?: Book;
    author?: Author;
    genre?: Genre;
    year?: Year;
}

export const init: Model = {};