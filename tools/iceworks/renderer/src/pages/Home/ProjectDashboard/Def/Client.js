import { remote } from 'electron';
import React from 'react';
import { Dialog } from '@icedesign/base';

// eslint-disable-next-line
let Client;
try {
  // eslint-disable-next-line
  Client = remote.require(DEF_CLIENT);
} catch (e) {
  Client = {
    Client: class A {
      on() {}
      run() {
        Dialog.alert({
          title: '提示',
          content: (
            <div style={{ width: 400 }}>缺少 DEF 客户端依赖，请查看文档</div>
          ),
        });
      }
    },
  };
}

export default Client;
