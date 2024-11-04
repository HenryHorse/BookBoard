import express, { Request, Response } from "express";
import { Genre } from "../models"

import Genres from "../services/genre-svc"

const router = express.Router();

router.get("/", (_, res: Response) => {
    Genres.index()
        .then((list: Genre[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:genreID", (req: Request, res: Response) => {
    const { genreID } = req.params;

    Genres.get(genreID)
        .then((genre: Genre) => res.json(genre))
        .catch((err) => res.status(404).send(err));

});

router.post("/", (req: Request, res: Response) => {
    const newGenre = req.body;

    Genres.create(newGenre)
        .then((genre: Genre) =>
            res.status(201).json(genre)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:genreID", (req: Request, res: Response) => {
    const { genreID } = req.params;
    const newGenre = req.body;

    Genres
        .update(genreID, newGenre)
        .then((genre: Genre) => res.json(genre))
        .catch((err) => res.status(404).end());
});

router.delete("/:genreID", (req: Request, res: Response) => {
    const { genreID } = req.params;

    Genres.remove(genreID)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;