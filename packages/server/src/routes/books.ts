import express, { Request, Response } from "express";
import { Book } from "../models/Book"

import Books from "../services/book-svc"

const router = express.Router();

router.get("/", (_, res: Response) => {
    Books.index()
        .then((list: Book[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:bookID", (req: Request, res: Response) => {
    const { bookID } = req.params;

    Books.get(bookID)
        .then((book: Book) => res.json(book))
        .catch((err) => res.status(404).send(err));

});

router.post("/", (req: Request, res: Response) => {
   const newBook = req.body;

   Books.create(newBook)
       .then((book: Book) =>
        res.status(201).json(book)
       )
       .catch((err) => res.status(500).send(err));
});

router.put("/:bookID", (req: Request, res: Response) => {
    const { bookID } = req.params;
    const newBook = req.body;

    Books
        .update(bookID, newBook)
        .then((book: Book) => res.json(book))
        .catch((err) => res.status(404).end());
});

router.delete("/:bookID", (req: Request, res: Response) => {
    const { bookID } = req.params;

    Books.remove(bookID)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;