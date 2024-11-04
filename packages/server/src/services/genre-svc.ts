
import { Genre} from "../models";
import { BookModel, GenreModel, AuthorModel, YearModel } from "../models"

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

function create(json: Genre): Promise<Genre> {
    const t = new GenreModel(json);
    return t.save();
}

function update(genreID: String, genre: Genre): Promise<Genre> {
    return GenreModel.findOneAndUpdate({ _id: genreID }, genre, {
        new: true
    }).then((updated) => {
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