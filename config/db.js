const mongoose = require('mongoose');
const config = require('config');

//! Add your mongoURI in default.json & production.json for local & production env respectively
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('MongoDb Connected...');
  } catch (error) {
    console.error(error.message);
    //exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;
