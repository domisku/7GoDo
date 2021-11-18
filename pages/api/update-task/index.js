import { MongoClient, ObjectId } from "mongodb";

async function updateTask(req, res) {
  if (req.method === "PATCH") {
    try {
      const data = req.body;

      const client = await MongoClient.connect(process.env.MONGODB_URI);

      const db = client.db();

      const tasksCollection = db.collection("tasks");

      let result = "";

      if (data.update === "status") {
        if (data.value === "completed") {
          result = await tasksCollection.findOneAndUpdate(
            { _id: new ObjectId(data.id) },
            { $set: { status: "completed" } },
            { returnDocument: true }
          );
        } else if (data.value === "ongoing") {
          result = await tasksCollection.findOneAndUpdate(
            { _id: new ObjectId(data.id) },
            { $set: { status: "ongoing" } },
            { returnDocument: true }
          );
        }
      } else if (data.update === "important") {
        if (data.value === "true") {
          result = await tasksCollection.findOneAndUpdate(
            { _id: new ObjectId(data.id) },
            { $set: { important: "true" } },
            { returnDocument: true }
          );
        } else if (data.value === "false") {
          result = await tasksCollection.findOneAndUpdate(
            { _id: new ObjectId(data.id) },
            { $set: { important: "false" } },
            { returnDocument: true }
          );
        }
      } else if (data.update === "task") {
        result = await tasksCollection.findOneAndUpdate(
          { _id: new ObjectId(data.id) },
          { $set: { task: data.task } },
          { returnDocument: true }
        );
      } else if (data.update === "notes") {
        result = await tasksCollection.findOneAndUpdate(
          { _id: new ObjectId(data.id) },
          { $set: { notes: data.notes } },
          { returnDocument: true }
        );
      }

      client.close();

      res.status(200).json({ result: result.value });
    } catch (error) {
      res.status(502);
    }
  } else res.status(400);
}

export default updateTask;
