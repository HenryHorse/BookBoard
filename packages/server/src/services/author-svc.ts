
import {Author} from "../models"
import { BookModel, GenreModel, AuthorModel, YearModel } from "../models"

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

function create(json: Author): Promise<Author> {
    const t = new AuthorModel(json);
    return t.save();
}

function update(authorID: String, author: Author): Promise<Author> {
    return AuthorModel.findOneAndUpdate({ _id: authorID }, author, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${authorID} not updated`;
        else return updated as Author;
    })
}

function remove(authorID: String): Promise<void> {
    return AuthorModel.findOneAndDelete({ _id: authorID }).then(
        (deleted) => {
            if (!deleted) throw `${authorID} not deleted`;
        }
    )
}


export default { index, get, create, update, remove };