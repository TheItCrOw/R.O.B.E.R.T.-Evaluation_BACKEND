import * as mongodb from "mongodb";
import { Dataset } from "./../models/dataset";

export const collections: {
   datasets?: mongodb.Collection<Dataset>;
} = {};

export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();

   const db = client.db("BABoenisch");

   const datasetCollection = db.collection<Dataset>("rateable_test_datasets");
   collections.datasets = datasetCollection;
}