import { Book } from "../models"
import { BookModel } from "../models"

function index(): Promise<Book[]> {
    return BookModel.find();
}

function get(bookID: String): Promise<Book> {
    return BookModel.find({ _id: bookID })
        .populate([
            { path: "publicationYear", select: "year" },
            { path: "genres", select: "name" },
            { path: "author", select: "name" }
        ])
        .then((list) => list[0])
        .catch((err) => {
            throw err;
        });
}

function create(json: Book): Promise<Book> {
    const t = new BookModel(json);
    return t.save();
}

function update(bookID: String, book: Book): Promise<Book> {
    return BookModel.findOneAndUpdate({ _id: bookID }, book, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${bookID} not updated`;
        else return updated as Book;
    })
}

function remove(bookID: String): Promise<void> {
    return BookModel.findOneAndDelete({ _id: bookID }).then(
        (deleted) => {
            if (!deleted) throw `${bookID} not deleted`;
        }
    )
}

export default { index, get, create, update, remove };