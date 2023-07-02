import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./../database/mongodb";

export const datasetRouter = express.Router();
datasetRouter.use(express.json());

datasetRouter.get("/unrated", async (_req, res) => {
    try {
        const query = { isRated: false };
        const options = { size: 1 };
        const result = await collections.datasets.aggregate([{ $match: query }, { $sample: options }]).toArray();
        if (result.length > 0)
            res.status(200).send(result[0]);
        else
            res.status(200).send(undefined);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

datasetRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const dataset = req.body;
        const { _id, ...updatedDataset } = dataset; // Exclude _id field from the update
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.datasets.updateOne(query, { $set: updatedDataset });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a dataset: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a dataset: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a dataset: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});