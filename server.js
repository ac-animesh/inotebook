const express = require('express');
const connectToMongo = require('./config/db');
const app = express();

connectToMongo();
const PORT = process.env.PORT || '8000';
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/user', require('./routes/api/user'));

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});
