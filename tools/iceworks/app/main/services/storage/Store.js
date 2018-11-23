const ElectronStore = require('electron-store');
const EventEmitter = require('events');

/**
 * 仅存储字符串文本信息
 */
class Store extends EventEmitter {
  constructor(namespace) {
    super();
    this.namespace = namespace;

    this.store = new ElectronStore();
  }

  set(values) {
    this.store.set(`${this.namespace}-srouce`, values);
  }

  get() {
    return this.store.get(`${this.namespace}-srouce`);
  }

  add(value) {
    let newValue = this.store.get(`${this.namespace}-srouce`) || [];
    newValue = newValue.filter((v) => v !== value);
    newValue.unshift(value);
    this.store.set(`${this.namespace}-srouce`, newValue);
  }

  remove(value) {
    let newValue = this.store.get(`${this.namespace}-srouce`) || [];
    if (Array.isArray(newValue)) {
      newValue = newValue.filter((v) => v !== value);
      this.store.set(`${this.namespace}-srouce`, newValue);
    }
  }

  has(value) {
    const dataSource = this.store.get(`${this.namespace}-srouce`) || [];
    return dataSource.some((v) => v === value);
  }

  delete() {
    this.store.delete(`${this.namespace}-srouce`);
  }

  get dataSource() {
    return this.store.get(`${this.namespace}-srouce`);
  }
}

module.exports = Store;
