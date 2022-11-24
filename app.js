const express = require('express');
const goodRouter = require('./routes/goods');

const connect = require("./schemas");
connect();

const app = express();
const port = 4000;

app.use(express.json());
app.use('/api', [goodRouter]);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, () => {
  console.log(port, 'Server is open with port!');
});