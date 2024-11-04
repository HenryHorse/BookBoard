
import { Genre } from "../models/Genre";
import {Year} from "../models";
import { Schema, model } from "mongoose";

const genres: Record<string, Genre> = {
    Fantasy: {
        name: "Fantasy",
        authors: [],
        books: [],
        years: []
    }
};

export function getGenre(_: string): Genre {
    return genres['Fantasy'];
}

const GenreSchema = new Schema<Genre>(
    {
        name: { type: String, required: true, trim: true},
        authors: [{ type: Schema.Types.ObjectId, ref: "Author"}],
        books: [{ type: Schema.Types.ObjectId, ref: "Book"}],
        years: [{ type: Schema.Types.ObjectId, ref: "Year"}],
    },
    { collection: "genres"}
);

const GenreModel = model<Genre>("Genre", GenreSchema);

function index(): Promise<Genre[]> {
    return GenreModel.find();
}

function get(genreID: String): Promise<Genre> {
    return GenreModel.find({ genreID })
        .then((list) => list[0])
        .catch((err) => {
            throw `${genreID} Not Found`;
        });
}

export default { index, get };