import { Message } from '@alifd/next';

export default function showMessage(message, type) {
  Message.show({
    type: type || 'error',
    title: 'Message',
    content: message || 'Plase try again',
    align: 'tr tr',
  });
}
