import { MongoClient } from "mongodb";

async function deleteTask(req, res) {
  if (req.method === "DELETE") {
    try {
      const data = req.body;

      const client = await MongoClient.connect(process.env.MONGODB_URI);

      const db = client.db();

      const tasksCollection = db.collection("tasks");

      await tasksCollection.deleteOne({
        _id: data.id,
      });

      client.close();

      res.status(200).json({ message: "Task deleted!" });
    } catch (error) {
      res.status(502);
    }
  } else res.status(400);
}

export default deleteTask;
