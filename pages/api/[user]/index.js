import { MongoClient } from "mongodb";

export default async function getTasks(req, res) {
  const { user } = req.query;
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const tasksCollection = db.collection('tasks');

  const selectedTasks = await tasksCollection.find({
    user: user,
  }).toArray();

  res.status(200).json(selectedTasks.reverse());

  client.close();
}
