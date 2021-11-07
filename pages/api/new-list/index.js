import { MongoClient } from 'mongodb';

async function listToDatabase(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
  
      const client = await MongoClient.connect(process.env.MONGODB_URI);

      const db = client.db();
  
      const listsCollection = db.collection('lists');
  
      const result = await listsCollection.insertOne(data);
  
      console.log(result);
  
      client.close();
  
      res.status(201).json({ message: 'Task inserted!' });
    }
  }
  
  export default listToDatabase;