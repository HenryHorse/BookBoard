
import { Genre } from "./Genre"
import { Year } from "./Year"
import { Book } from "./Book"

export interface Author {
    name: string;
    genres: Genre[];
    books: Book[];
    years: Year[];
}