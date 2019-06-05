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
  workDirectory: {
    type: 'string',
    default: userHome,
  },
  project: {
    type: 'string',
    default: {},
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
        name: '飞冰物料',
        description: '基于 ICE Design 设计语言，专业视觉设计，每周物料更新，丰富组合区块，不同领域模板',
        homepage: 'https://alibaba.github.io/ice/',
        logo: 'https://img.alicdn.com/tfs/TB1JbQWoQUmBKNjSZFOXXab2XXa-242-134.png',
        source: 'https://ice.alicdn.com/assets/react-materials.json',
        tags: [
          '官方',
          'React',
          'ICE'
        ]
      }
    ],
  },
};

export default new Store({ schema });
