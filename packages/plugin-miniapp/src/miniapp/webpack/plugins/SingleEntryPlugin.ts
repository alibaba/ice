import SingleEntryDependency from '../dependencies/SingleEntryDependency.js';

export default class SingleEntryPlugin {
  context: any;
  entry: string;
  name: string;
  miniType: any;

  constructor(context, entry, name, miniType) {
    this.context = context;
    this.entry = entry;
    this.name = name;
    this.miniType = miniType;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      'SingleEntryDependency',
      (compilation, { normalModuleFactory }) => {
        compilation.dependencyFactories.set(
          SingleEntryDependency,
          normalModuleFactory,
        );
      },
    );

    compiler.hooks.make.tapAsync(
      'SingleEntryPlugin',
      (compilation, callback) => {
        const { entry, name, context, miniType } = this;

        const dep = SingleEntryPlugin.createDependency(entry, name, miniType);
        compilation.addEntry(context, dep, name, callback);
      },
    );
  }

  static createDependency(entry, name, miniType) {
    return new SingleEntryDependency(entry, name, { name }, miniType);
  }
}
