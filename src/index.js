// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();

app.use(express.json());
const port = 5000;
const hostname = 'localhost';

const routes = require('./routes/movies');

app.use('/movies', routes);

app.listen(port, () => {
  console.log(`server berjalan pada http://${hostname}:${port}`);
});
