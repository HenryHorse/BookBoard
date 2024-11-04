
import { Year } from "../models/Year"
import {Author, Genre} from "../models";
import { Schema, model } from "mongoose";

const years: Record<string, Year> = {
    year2010: {
        year: 2010,
        books: [],
        authors: [],
        genres: []
    }
}


export function getYear(_: string): Year {
    return years["year2010"];
}

const YearSchema = new Schema<Year>(
    {
        year: { type: Number, required: true, trim: true},
        books: [{ type: Schema.Types.ObjectId, ref: "Book"}],
        authors: [{ type: Schema.Types.ObjectId, ref: "Author"}],
        genres: [{ type: Schema.Types.ObjectId, ref: "Genre"}],
    },
    { collection: "years"}
);

const YearModel = model<Year>("Year", YearSchema);

function index(): Promise<Year[]> {
    return YearModel.find();
}

function get(yearID: String): Promise<Year> {
    return YearModel.find({ yearID })
        .then((list) => list[0])
        .catch((err) => {
            throw `${yearID} Not Found`;
        });
}

export default { index, get };