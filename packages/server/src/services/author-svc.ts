
import {Author, Book, Genre, Year} from "../models"
import { Schema, model } from "mongoose";

const authors: Record<string, Author> = {
    BrandonSanderson: {
        name: "Brandon Sanderson",
        genres: [],
        books: [],
        years: []
    }
};

export function getAuthor(_: string): Author {
    return authors["BrandonSanderson"];
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

const AuthorModel = model<Author>("Author", AuthorSchema);

function index(): Promise<Author[]> {
    return AuthorModel.find();
}

function get(authorID: String): Promise<Author> {
    return AuthorModel.find({ authorID })
        .then((list) => list[0])
        .catch((err) => {
            throw `${authorID} Not Found`;
        });
}

export default { index, get };