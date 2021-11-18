import { MongoClient } from "mongodb";

async function listToDatabase(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const client = await MongoClient.connect(process.env.MONGODB_URI);

      const db = client.db();

      const listsCollection = db.collection("lists");

      await listsCollection.insertOne(data);

      client.close();

      res.status(201).json({ message: "Task inserted!" });
    } catch (error) {
      res.status(502);
    }
  } else res.status(400);
}

export default listToDatabase;
