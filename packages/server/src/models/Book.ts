
import { Author } from "./Author"
import { Year } from "./Year"
import { Genre } from "./Genre"
import { Schema, model, Types} from "mongoose";

export interface Book {
    _id?: Types.ObjectId;
    title: string;
    author: Author[];
    genres: Genre[];
    publicationYear: Year;
    description: string;
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

export const BookModel = model<Book>("Book", BookSchema);
