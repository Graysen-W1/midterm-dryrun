import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';  // For async file reading
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uri = process.env.MONGO_URI;
const myVar = 'injected from server';

app.get('/', (req, res) => {
  res.send('Hello World: DEV')
})

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongo() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
connectToMongo();


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
