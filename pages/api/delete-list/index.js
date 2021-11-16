import { MongoClient, ObjectId } from 'mongodb';

async function deleteList(req, res) {
    if (req.method === 'DELETE') {
      const data = req.body;
  
      const client = await MongoClient.connect(process.env.MONGODB_URI);

      const db = client.db();
  
      const listsCollection = db.collection('lists');
      const listsResult = await listsCollection.deleteOne({ _id: new ObjectId(data.id) });

      const tasksCollection = db.collection('tasks');
      const tasksResult = await tasksCollection.deleteMany({ listId: data.id });
  
      client.close();
  
      res.status(201).json({ message: 'List deleted!' });
    }
  }
  
  export default deleteList;