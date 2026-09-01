const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/instant_mechanic';
    if (connStr.includes('cluster0.xxx.mongodb.net')) {
      console.log('[MongoDB Notice] Placeholder MONGO_URI in .env detected. Falling back to local MongoDB: mongodb://127.0.0.1:27017/instant_mechanic');
      connStr = 'mongodb://127.0.0.1:27017/instant_mechanic';
    }
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning]: Could not connect to database (${error.message}). Operations will use in-memory seed dataset fallback until MongoDB Atlas URI is set in backend/.env.`);
    return false;
  }
};


module.exports = connectDB;
