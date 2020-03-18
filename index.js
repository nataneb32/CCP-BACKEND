const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes')
const PORT = 3001;
const HOST = '0.0.0.0';

const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0-ahmhu.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
app.use(cors())
app.use(express.json());
app.use(routes)

app.listen(3001);
