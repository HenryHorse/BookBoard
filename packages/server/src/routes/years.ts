import express, { Request, Response } from "express";
import { Year } from "../models"

import Years from "../services/year-svc"

const router = express.Router();

router.get("/", (_, res: Response) => {
    Years.index()
        .then((list: Year[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:yearID", (req: Request, res: Response) => {
    const { yearID } = req.params;

    Years.get(yearID)
        .then((year: Year) => res.json(year))
        .catch((err) => res.status(404).send(err));

});

router.post("/", (req: Request, res: Response) => {
    const newYear = req.body;

    Years.create(newYear)
        .then((year: Year) =>
            res.status(201).json(year)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:yearID", (req: Request, res: Response) => {
    const { yearID } = req.params;
    const newYear = req.body;

    Years
        .update(yearID, newYear)
        .then((year: Year) => res.json(year))
        .catch((err) => res.status(404).end());
});

router.delete("/:yearID", (req: Request, res: Response) => {
    const { yearID } = req.params;

    Years.remove(yearID)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;