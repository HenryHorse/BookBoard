// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo"

import { Authors, Books, Genres, Years } from "./services"

import books from "./routes/books"
import genres from "./routes/genres"
import years from "./routes/years"
import authors from "./routes/authors"

import {BookPage} from "./pages/Book";
import {GenrePage} from "./pages/Genre";
import {YearPage} from "./pages/Year";
import {AuthorPage} from "./pages/Author";
import { LoginPage, RegisterPage } from "./pages/auth"

import auth, { authenticateUser } from "./routes/auth"


const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("BookBoardDB");

app.use(express.json());
app.use("/api/books", authenticateUser, books);
app.use("/api/genres", authenticateUser, genres);
app.use("/api/years", authenticateUser, years);
app.use("/api/authors", authenticateUser, authors);
app.use("/auth", auth);
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


app.get("/genres/:genreId", (req: Request, res: Response) => {
    const { genreId } = req.params;

    Genres.get(genreId).then((data) => {
        const page = new GenrePage(data);
        res.set("Content-Type", "text/html").send(page.render());
    })
})

app.get("/years/:yearId", (req: Request, res: Response) => {
    const { yearId } = req.params;

    Years.get(yearId).then((data) => {
        const page = new YearPage(data);
        res.set("Content-Type", "text/html").send(page.render());
    })
})

app.get("/authors/:authorId", (req: Request, res: Response) => {
    const { authorId } = req.params;

    Authors.get(authorId).then((data) => {
        const page = new AuthorPage(data);
        res.set("Content-Type", "text/html").send(page.render());
    })
})

app.get("/login", (req: Request, res: Response) => {
    const page = new LoginPage();
    res.set("Content-Type", "text/html").send(page.render());
});

app.get("/register", (req: Request, res: Response) => {
    const page = new RegisterPage();
    res.set("Content-Type", "text/html").send(page.render());
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});