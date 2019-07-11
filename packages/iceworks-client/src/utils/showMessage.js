import { Message } from '@alifd/next';

export default function showMessage(message, type = 'error') {
  let content = 'Please try again';

  if (message) {
    content = (message instanceof Error || typeof message === 'object') && message.message ? message.message : message;
  }

  Message.show({
    title: 'Message',
    align: 'tr tr',
    type,
    content,
  });
}
