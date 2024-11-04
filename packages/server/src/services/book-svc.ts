import { Book } from "../models/Book"
import { getYear } from "./year-svc"
import { Schema, model } from "mongoose";
import {Genre, Year} from "../models";
import "../services/genre-svc"
import "../services/author-svc"


const books: Record<string, Book> = {
    TWoK: {
        title: "The Way of Kings",
        author: [],
        genres: [],
        publicationYear: getYear("year2011"),
        description: "This book is about Roshar and the people who inhabit it."
    }
};

export function getBook(_: string): Book {
    return books['TWoK'];
}


const BookSchema = new Schema<Book>(
    {
        title: { type: String, required: true, trim: true},
        author: [{ type: Schema.Types.ObjectId, ref: "Author"}],
        genres: [{ type: Schema.Types.ObjectId, ref: "Genre"}],
        publicationYear: { type: Schema.Types.ObjectId, ref: "Year"},
        description: { type: String, required: true, trim: true}
    },
    { collection: "books"}
);

const BookModel = model<Book>("Book", BookSchema);

function index(): Promise<Book[]> {
    return BookModel.find();
}

function get(bookID: String): Promise<Book> {
    return BookModel.find({ title: bookID })
        .populate("publicationYear")
        .populate("genres")
        .populate("author")
        .then((list) => list[0])
        .catch((err) => {
            throw err;
        });
}



export default { index, get };