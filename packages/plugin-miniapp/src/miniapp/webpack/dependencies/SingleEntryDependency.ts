import webpack from '@ice/bundles/compiled/webpack/index.js';

export default class SingleEntryDependency extends webpack.dependencies.ModuleDependency {
  name: string;
  miniType: any;
  loc: any;
  options: Record<string, any>;

  constructor(request, name, loc, miniType, options = {}) {
    super(request);
    this.name = name;
    this.loc = loc;
    this.miniType = miniType;
    this.options = options;
  }

  // @ts-ignore
  get type() {
    return 'single entry';
  }
}
