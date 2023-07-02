import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database/mongodb";
import { datasetRouter } from "./routes/dataset.routes";

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { DB_URI } = process.env;

if (!DB_URI) {
    console.error("No DB_URI environment variable has been defined in config.env");
    process.exit(1);
}

connectToDatabase(DB_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        var port = 5200;

        //add all routes here
        app.use("/datasets", datasetRouter);

        // start the Express server
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}...`);
        });

    })
    .catch(error => console.error(error));