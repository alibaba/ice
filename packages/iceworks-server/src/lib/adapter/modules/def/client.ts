/* eslint import/no-mutable-exports: 0, global-require: 0 */

let ClientWrap;

try {
  ClientWrap = require('@ali/def-pub-client');
} catch (e) {
  ClientWrap = {
    Client: class C {
      public run() {
        throw new Error('缺少 DEF 客户端依赖');
      }
    },
  };
}

export default ClientWrap;
