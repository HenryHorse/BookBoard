
import { Author } from "./Author"
import { Genre } from "./Genre"
import { Book } from "./Book"

export interface Year {
    year: number;
    books: Book[];
    authors: Author[];
    genres: Genre[];
}