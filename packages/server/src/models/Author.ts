
import { Genre } from "./Genre"
import { Year } from "./Year"
import { Book } from "./Book"
import { Schema, model, Types } from "mongoose";

export interface Author {
    _id?: Types.ObjectId;
    name: string;
    genres: Genre[];
    books: Book[];
    years: Year[];
}

const AuthorSchema = new Schema<Author>(
    {
        name: { type: String, required: true, trim: true},
        genres: [{ type: Schema.Types.ObjectId, ref: "Genre"}],
        books: [{ type: Schema.Types.ObjectId, ref: "Book"}],
        years: [{ type: Schema.Types.ObjectId, ref: "Year"}],
    },
    { collection: "authors"}
);

export const AuthorModel = model<Author>("Author", AuthorSchema);


