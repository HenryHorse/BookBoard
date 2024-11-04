import express, { Request, Response } from "express";
import { Author } from "../models"

import Authors from "../services/author-svc"

const router = express.Router();

router.get("/", (_, res: Response) => {
    Authors.index()
        .then((list: Author[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:authorID", (req: Request, res: Response) => {
    const { authorID } = req.params;

    Authors.get(authorID)
        .then((author: Author) => res.json(author))
        .catch((err) => res.status(404).send(err));

});

router.post("/", (req: Request, res: Response) => {
    const newAuthor = req.body;

    Authors.create(newAuthor)
        .then((author: Author) =>
            res.status(201).json(author)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:authorID", (req: Request, res: Response) => {
    const { authorID } = req.params;
    const newAuthor = req.body;

    Authors
        .update(authorID, newAuthor)
        .then((author: Author) => res.json(author))
        .catch((err) => res.status(404).end());
});

router.delete("/:authorID", (req: Request, res: Response) => {
    const { authorID } = req.params;

    Authors.remove(authorID)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;