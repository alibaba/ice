let Client;

try {
  Client = require('@ali/def-pub-client');
} catch (e) {
  Client = {
    Client: class C {
      run() {
        throw new Error('缺少 DEF 客户端依赖');
      }
    }
  };
}

export default Client;
