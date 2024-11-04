
import { Year } from "./Year"
import { Author } from "./Author"
import { Book } from "./Book"
import { Schema, model, Types } from "mongoose";

export interface Genre {
    _id?: Types.ObjectId;
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


const GenreSchema = new Schema<Genre>(
    {
        name: { type: String, required: true, trim: true},
        authors: [{ type: Schema.Types.ObjectId, ref: "Author"}],
        books: [{ type: Schema.Types.ObjectId, ref: "Book"}],
        years: [{ type: Schema.Types.ObjectId, ref: "Year"}],
    },
    { collection: "genres"}
);

export const GenreModel = model<Genre>("Genre", GenreSchema);