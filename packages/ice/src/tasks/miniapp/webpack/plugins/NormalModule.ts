import webpack from '@ice/bundles/compiled/webpack/index.js';

export default class NormalModule extends webpack.NormalModule {
  name: string;
  miniType: any;
  constructor(data) {
    super(data);
    this.name = data.name;
    this.miniType = data.miniType;
  }

  serialize(context) {
    const { write } = context;
    write(this.name);
    write(this.miniType);
    super.serialize(context);
  }

  deserialize(context) {
    const { read } = context;
    this.name = read();
    this.miniType = read();
    super.deserialize(context);
  }
}

export function registerSerialization() {
  webpack.util.serialization.register(NormalModule, '@ice/app/esm/tasks/miniapp/webpack/plugins/NormalModule', 'NormalModule', {
    serialize(obj, context) {
      obj.serialize(context);
    },
    deserialize(context) {
      const obj = new NormalModule({
        // will be deserialized by Module
        layer: null,
        type: '',
        // will be filled by updateCacheModule
        resource: '',
        context: '',
        request: null,
        userRequest: null,
        rawRequest: null,
        loaders: null,
        matchResource: null,
        parser: null,
        parserOptions: null,
        generator: null,
        generatorOptions: null,
        resolveOptions: null,
      });
      obj.deserialize(context);
      return obj;
    },
  });
}

