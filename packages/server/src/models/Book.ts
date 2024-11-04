
import { Author } from "./Author"
import { Year } from "./Year"
import { Genre } from "./Genre"


export interface Book {
    title: string;
    author: Author[];
    genres: Genre[];
    publicationYear: Year;
    description: string;
}