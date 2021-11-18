import { MongoClient } from "mongodb";

export default async function getTasks(req, res) {
  if (req.method === "GET") {
    try {
      const { user } = req.query;
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db();

      const tasksCollection = db.collection("tasks");

      const selectedTasks = await tasksCollection
        .find({
          user: user,
        })
        .toArray();

      res.status(200).json(selectedTasks.reverse());

      client.close();
    } catch (error) {
      res.status(502);
    }
  } else res.status(400);
}
