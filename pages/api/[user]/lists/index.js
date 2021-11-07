import { MongoClient } from "mongodb";

export default async function getLists(req, res) {
  const { user } = req.query;
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const listsCollection = db.collection('lists');

  const selectedLists = await listsCollection.find({
    user: user,
  }).toArray();

  res.status(200).json(selectedLists.reverse());

  client.close();
}
