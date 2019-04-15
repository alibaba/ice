const { dialog } = require('electron');
const EventEmiter = require('events');

class Exception extends EventEmiter {
  constructor() {
    super();

    this.on('did-error', (error) => {
      dialog.showErrorBox('Error', error.message);
    });
  }

  catch(error) {
    return this.emit('did-error', error);
  }
}

module.exports = new Exception();
