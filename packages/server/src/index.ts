// src/index.ts
import express, { Request, Response } from "express";
import {BookPage} from "./pages/Book";
import { connect } from "./services/mongo"
import Books from "./services/book-svc"
import books from "./routes/books"
import genres from "./routes/genres"
import years from "./routes/years"
import authors from "./routes/authors"

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("BookBoardDB");

app.use(express.json());
app.use("/api/books", books);
app.use("/api/genres", genres);
app.use("/api/years", years);
app.use("/api/authors", authors);
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