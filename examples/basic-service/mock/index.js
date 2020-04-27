module.exports = {
  'GET /todo_getAll': {
    'errorCode': '0',
    'errorMsg': '',
    'data': [
      {
        'id': '1',
        'title': '安卓',
        'dnoe': true
      },
      {
        'id': '2',
        'title': 'iOS',
        'dnoe': true
      }
    ],
    'success': true
  },
  'GET /todo_getOne': {
    'errorCode': '0',
    'errorMsg': '',
    'data': {
      'id': '2222222',
      'title': '安卓',
      'dnoe': true
    },
    'requestId': '@guid',
    'success': true
  },
  'POST /todo_add': {
    'errorCode': '0',
    'errorMsg': '',
    'data': {
      'id': '2222222',
      'title': '安卓',
      'dnoe': true
    },
    'requestId': '@guid',
    'success': true
  },
};
