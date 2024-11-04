
import { Author } from "./Author"
import { Genre } from "./Genre"
import { Book } from "./Book"
import { Schema, model, Types } from "mongoose";

export interface Year {
    _id?: Types.ObjectId;
    year: number;
    books: Book[];
    authors: Author[];
    genres: Genre[];
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

export const YearModel = model<Year>("Year", YearSchema);
