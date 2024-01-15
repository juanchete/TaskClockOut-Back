// app.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 3000;

const endpoint1Router = require('./src/routes/stocksEndpoint');

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/api/stocks', endpoint1Router);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});