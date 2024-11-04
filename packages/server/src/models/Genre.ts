
import { Year } from "./Year"
import { Author } from "./Author"
import { Book } from "./Book"

export interface Genre {
    name: GenreType;
    authors: Author[];
    books: Book[];
    years: Year[];
}

export type GenreType =
    | "Fantasy"
    | "Sci-Fi"
    | "Non-Fiction"
    | "Mystery"
    | "Historical Fiction"
    | "Self-Help"
    | "Romance"
    | "Action"
    | "Horror"