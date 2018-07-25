/* eslint-disable */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:3333',
}));

app.post('/getListData.json', (req, res) => {
  const page = req.body ? req.body.page || 1 : 1;
  const actIds = req.body.actIds || [];
  const app = req.body.app || '';

  setTimeout(() => {
    res.json({
      success: true,
      data: {
        query: {
          page: Number(page),
          total: 100,
          pageSize: 10,
        },
        lists: generator(page, app, actIds),
      },
    });
  }, 1000);
});
app.get('/getFilterData.json', (req, res) => {
  const actKey = req.query.actKey || 'default';

  setTimeout(() => {
    res.json({
      success: true,
      data: {
        actIds: [`${actKey}1`, `${actKey}2`, `${actKey}3`, `${actKey}4`],
      },
    });
  }, 1000);
});
app.get('/deleteRecord.json', (req, res) => {
  const name = req.query.name;

  res.json({
    success: true,
    message: `删除${name}成功！`,
    data: {},
  });
});

function generator(page, app, actIds) {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      title: `app = ${app} page ${page} index ${i}`,
      name: `name${page} index ${i}`,
      age: `actIds = ${actIds} index ${i}`,
    });
  }

  return data;
}

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
