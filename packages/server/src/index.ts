// src/index.ts
import express, { Request, Response } from "express";
import {BookPage} from "./pages/Book";
import {getBook} from "./services/mock";
import { connect } from "./services/mongo"
import Books from "./services/book-svc"
import Genres from "./services/genre-svc"
import Authors from "./services/author-svc"
import Years from "./services/year-svc"

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("BookBoardDB");

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("<h2>Hello World!</h2>");
});

app.get("/books/:bookId", (req: Request, res: Response) => {
    const { bookId } = req.params;

    Books.get(bookId).then((data) => {
        const page = new BookPage(data);
        res.set("Content-Type", "text/html").send(page.render());
    });
})



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});