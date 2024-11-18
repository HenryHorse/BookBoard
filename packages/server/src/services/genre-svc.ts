
import { Genre} from "../models";
import { GenreModel } from "../models"

function index(): Promise<Genre[]> {
    return GenreModel.find();
}

function get(genreID: String): Promise<Genre> {
    return GenreModel.find({ _id: genreID })
        .populate([
            { path: "books", select: "title" },
            { path: "authors", select: "name" },
            { path: "years", select: "year" }
        ])
        .then((list) => list[0])
        .catch((err) => {
            throw err;
        });
}

function create(json: Genre): Promise<Genre> {
    const t = new GenreModel(json);
    return t.save();
}

function update(genreID: String, genre: Genre): Promise<Genre> {
    return GenreModel.findOneAndUpdate({ _id: genreID }, genre, {
        new: true
    })
        .populate([
            { path: "books", select: "title" },
            { path: "authors", select: "name" },
            { path: "years", select: "year" }
        ])
        .then((updated) => {
            if (!updated) throw `${genreID} not updated`;
            else return updated as Genre;
        })
}

function remove(genreID: String): Promise<void> {
    return GenreModel.findOneAndDelete({ _id: genreID }).then(
        (deleted) => {
            if (!deleted) throw `${genreID} not deleted`;
        }
    )
}


export default { index, get, create, update, remove };