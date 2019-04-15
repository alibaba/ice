'use strict';

module.exports = (app) => {
  // app.io.of('/')
  app.io.route('chat', app.io.controller.chat.index);

  // app.io.of('/chat')
  app.io.of('/chat').route('chat', app.io.controller.chat.index);
};
