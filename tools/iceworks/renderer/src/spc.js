import { ipcRenderer } from 'electron';
import { EventEmitter } from 'events';
import terms from './terms';

let clientInstance = null;

const CHANNEL_DATA = 'session:data';
const CHANNEL_NEWLINE = 'session:newline';
const CHANNEL_EXIT = 'session:exit';

class SpcClient extends EventEmitter {
  constructor() {
    super();

    if (clientInstance) {
      return clientInstance;
    }

    ipcRenderer.on(CHANNEL_DATA, (event, data) => {
      this.emit(CHANNEL_DATA, data);
    });

    ipcRenderer.on(CHANNEL_EXIT, (event, data) => {
      this.emit(CHANNEL_EXIT, data);
    });

    this.on(CHANNEL_DATA, (data) => {
      terms.write(data.cwd, data.data);
    });
    this.on(CHANNEL_EXIT, (data) => {
      terms.newline(data.cwd);
    });
    this.on(CHANNEL_NEWLINE, (data) => {
      terms.newline(data.cwd);
    });
  }

  emit(ch, data) {
    super.emit(ch, data);
  }
}

clientInstance = new SpcClient();

export default clientInstance;
