import { MongoClient } from "mongodb";

export default async function getLists(req, res) {
  if (req.method === "GET") {
    try {
      const { user } = req.query;
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db();

      const listsCollection = db.collection("lists");

      const selectedLists = await listsCollection
        .find({
          user: user,
        })
        .toArray();

      res.status(200).json(selectedLists.reverse());

      client.close();
    } catch (error) {
      res.status(502);
    }
  } else res.status(400);
}
