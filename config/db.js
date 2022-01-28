const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURL');

const connectToMongo = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB is connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
