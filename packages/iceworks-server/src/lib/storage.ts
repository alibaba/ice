import * as EventEmitter from 'events';
import * as path from 'path';
import * as Conf from 'conf';
import * as mkdirp from 'mkdirp';

 // @TODO
const defaultCwd = path.join(__dirname, '../../data');
mkdirp.sync(defaultCwd);

class DataStore extends Conf {
  constructor(options?) {
    options = {
      name: 'config',
      ...options
    };

    if (options.cwd) {
      options.cwd = path.isAbsolute(options.cwd) ? options.cwd : path.join(defaultCwd, options.cwd);
    } else {
      options.cwd = defaultCwd;
    }

    options.configName = options.name;
    delete options.name;
    super(options);
  }
}

class Store extends EventEmitter {
  private store: Conf;

  constructor(options?) {
    super();
    this.store = new DataStore(options);
  }

  set(key: string, values: any): void {
    this.store.set(key, values);
  }

  get(key: string): any {
    return this.store.get(key);
  }

  add(key: string, value: string): void {
    const values = this.store.get(key);
    if (Array.isArray(values)) {
      this.store.set(key, values.filter((v) => v !== value).unshift(value));
    }
  }

  remove(key: string, value: string): void {
    const values = this.store.get(key) || [];
    if (Array.isArray(values)) {
      this.store.set(key, values.filter((v) => v !== value));
    }
  }

  has(key: string, value: string): boolean {
    const values = this.store.get(key);
    return Array.isArray(values) ? values.some((v) => v === value) : false;
  }

  delete(key: string): void {
    this.store.delete(key);
  }
}

const schema = {
  "stat": {
    "type": "string",
  },
  "iceland-stat": {
    "type": "string",
  },
  "currentProject": {
    "type": "string",
  },
  "projects": {
    "type": "array",
    "items": {
      "type": "string",
    }
  }
}

export default new Store({schema});
