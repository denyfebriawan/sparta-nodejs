const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect('mongodb://denyfebriawan:denyfebriawan@ac-eqp3ojr-shard-00-00.bp160w6.mongodb.net:27017,ac-eqp3ojr-shard-00-01.bp160w6.mongodb.net:27017,ac-eqp3ojr-shard-00-02.bp160w6.mongodb.net:27017/?ssl=true&replicaSet=atlas-jrwx8m-shard-0&authSource=admin&retryWrites=true&w=majority')
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;