import { MongoClient, ObjectId } from "mongodb";

async function deleteList(req, res) {
  if (req.method === "DELETE") {
    try {
      const data = req.body;

      const client = await MongoClient.connect(process.env.MONGODB_URI);

      const db = client.db();

      const listsCollection = db.collection("lists");
      await listsCollection.deleteOne({
        _id: new ObjectId(data.id),
      });

      const tasksCollection = db.collection("tasks");
      await tasksCollection.deleteMany({ listId: data.id });

      client.close();

      res.status(200).json({ message: "List deleted!" });
    } catch (error) {
      res.status(502);
    }
  } else res.status(400);
}

export default deleteList;
