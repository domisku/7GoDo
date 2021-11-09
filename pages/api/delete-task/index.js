import { MongoClient, ObjectId } from 'mongodb';

async function deleteTask(req, res) {
    if (req.method === 'DELETE') {
      const data = req.body;
  
      const client = await MongoClient.connect(process.env.MONGODB_URI);

      const db = client.db();
  
      const tasksCollection = db.collection('tasks');
  
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(data.id) });
  
      console.log(result);
  
      client.close();
  
      res.status(201).json({ message: 'Task deleted!' });
    }
  }
  
  export default deleteTask;