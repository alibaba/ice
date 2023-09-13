/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const express = require('express');
const compress = require('compression');
const cors = require('cors');

const PORT = 4000;
const app = express();

app.use(compress());
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的HTTP方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
}));

app.listen(PORT, () => {
  console.log(`React Notes listening at ${PORT}...`);
});

app.get('/getData', (req, res) => {
  const data = {
    name: 'John',
    age: 25,
    city: 'New York',
  };

  res.json(data);
});
