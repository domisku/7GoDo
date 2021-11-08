import { MongoClient, ObjectId } from 'mongodb';

async function updateTask(req, res) {
    if (req.method === 'PATCH') {
      const data = req.body;
  
      const client = await MongoClient.connect(process.env.MONGODB_URI);

      const db = client.db();
  
      const tasksCollection = db.collection('tasks');
  
      const result = await tasksCollection.findOneAndUpdate({ _id: new ObjectId(data.id) }, {$set: {status: 'completed'}}, {returnDocument: true});
  
      console.log(result);
  
      client.close();
  
      res.status(201).json({ result: result.value });
    }
  }
  
  export default updateTask;