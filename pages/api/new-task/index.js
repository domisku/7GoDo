import { MongoClient } from 'mongodb';

async function taskToDatabase(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
  
      const client = await MongoClient.connect(process.env.MONGODB_URI);

      const db = client.db();
  
      const tasksCollection = db.collection('tasks');
  
      const result = await tasksCollection.insertOne(data);
  
      console.log(result);
  
      client.close();
  
      res.status(201).json({ message: 'Task inserted!' });
    }
  }
  
  export default taskToDatabase;