import mongoose, { Mongoose } from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  
  if (connection.isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    console.log('Attempting to connect to MongoDB with URI:', MONGODB_URI); // Debug log
    const db = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false, 
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('New MongoDB connection established, readyState:', connection.isConnected);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export default dbConnect;