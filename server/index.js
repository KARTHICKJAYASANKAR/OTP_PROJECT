const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {PORT , mongoDBURL} = require('./config')
const router = require('./routes')
dotenv.config();
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(router)

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


