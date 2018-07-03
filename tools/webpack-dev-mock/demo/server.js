const express = require('express');

const mockServer = require('../');

const app = express();

mockServer(app);

app.get('/', (req, res) => res.send('hello world'));

app.listen(6001, () => {
  console.log('Example app listening on port 6001!');
  console.log('http://127.0.0.1:6001');
});
