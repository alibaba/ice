import * as path from 'path';
import * as Conf from 'conf';
import * as mkdirp from 'mkdirp';
import * as userHome from 'user-home';

// @TODO
const defaultCwd = path.join(__dirname, '../../data');
mkdirp.sync(defaultCwd);

class DataStore extends Conf {
  constructor(options?) {
    options = {
      name: 'config',
      ...options,
    };

    if (options.cwd) {
      options.cwd = path.isAbsolute(options.cwd)
        ? options.cwd
        : path.join(defaultCwd, options.cwd);
    } else {
      options.cwd = defaultCwd;
    }

    options.configName = options.name;
    delete options.name;
    super(options);
  }
}

class Store {
  private store: Conf;

  constructor(options?) {
    this.store = new DataStore(options);
  }

  set(key: string, values: any): void {
    this.store.set(key, values);
  }

  get(key: string): any {
    return this.store.get(key);
  }

  add(key: string, value: any): void {
    const values = this.store.get(key);
    if (Array.isArray(values)) {
      const filteredVaules = values.filter((v) => v !== value);
      filteredVaules.unshift(value);
      this.store.set(key, filteredVaules);
    }
  }

  remove(key: string, filter: (v: any) => boolean): void {
    const values = this.store.get(key) || [];
    if (Array.isArray(values)) {
      this.store.set(key, values.filter(filter));
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
  workFolder: {
    type: 'string',
    default: userHome,
  },
  user: {
    type: 'object',
    default: {
      workId: '',
      name: '请登录',
      avatarUrl: 'https://img.alicdn.com/tfs/TB1hjBJXLxj_uVjSZFqXXaboFXa-147-150.jpg',
      isLogin: false,
    },
  },
  project: {
    type: 'string',
    default: '',
  },
  projects: {
    type: 'array',
    default: [],
  },
  editor: {
    type: 'string',
    default: 'vscode',
  },
  material: {
    type: 'array',
    default: [
      {
        "official": true,
        "name": "飞冰物料",
        "type": "react",
        "source": "https://ice.alicdn.com/assets/react-materials.json"
      }
    ],
  },
  oss: {
    type: 'array',
    default: [],
  },
  panelSettings: {
    type: 'array',
    default: [],
  },
};

export default new Store({ schema });
