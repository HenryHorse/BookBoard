
import { Year} from "../models/Year"
import { BookModel, GenreModel, AuthorModel, YearModel } from "../models"

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

function create(json: Year): Promise<Year> {
    const t = new YearModel(json);
    return t.save();
}

function update(yearID: String, year: Year): Promise<Year> {
    return YearModel.findOneAndUpdate({ _id: yearID }, year, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${yearID} not updated`;
        else return updated as Year;
    })
}

function remove(yearID: String): Promise<void> {
    return YearModel.findOneAndDelete({ _id: yearID }).then(
        (deleted) => {
            if (!deleted) throw `${yearID} not deleted`;
        }
    )
}


export default { index, get, create, update, remove };