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

const NAMESPACE_SUFFIX: string = '-srouce';

class Store extends EventEmitter {
  private key: string = '';
  private store: Conf;

  constructor(namespace: string) {
    super();

    this.key = namespace + NAMESPACE_SUFFIX;
    this.store = new DataStore();
  }

  set(values: any): void {
    this.store.set(`${this.key}`, values);
  }

  get(): any {
    return this.store.get(this.key);
  }

  add(value: string): void {
    const values = this.store.get(this.key);
    if (Array.isArray(values)) {
      this.store.set(this.key, values.filter((v) => v !== value).unshift(value));
    }
  }

  remove(value: string): void {
    const values = this.store.get(this.key) || [];
    if (Array.isArray(values)) {
      this.store.set(this.key, values.filter((v) => v !== value));
    }
  }

  has(value: string): boolean {
    const values = this.store.get(this.key);
    return Array.isArray(values) ? values.some((v) => v === value) : false;
  }

  delete(): void {
    this.store.delete(this.key);
  }

  get dataSource() {
    return this.store.get(this.key);
  }
}

export const statStorage = new Store('stat'); // 统计记录
export const recordStorage = new Store('record'); // 项目使用记录
export const projectsStorage = new Store('projects'); // 所有项目列表
export const workspaceStorage = new Store('workspace'); // 工作空间
export const icelandStatStorage = new Store('iceland-stat'); // Iceland 统计记录
