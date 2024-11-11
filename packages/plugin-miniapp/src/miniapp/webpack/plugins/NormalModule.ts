import webpack from '@ice/bundles/compiled/webpack/index.js';
import { isEmpty } from '@ice/shared';
import type { META_TYPE } from '../../../helper/index.js';
import { componentConfig, elementNameSet, componentNameSet } from '../utils/component.js';

export class BaseNormalModule extends webpack.NormalModule {
  elementNameSet: Set<string>;

  componentNameSet: Set<string>;

  collectProps: { [name: string]: string };

  constructor(data) {
    super(data);

    this.collectProps = {};
    this.elementNameSet = new Set();
    this.componentNameSet = new Set();
  }

  clear() {
    this.collectProps = {};
    this.elementNameSet.clear();
    this.componentNameSet.clear();
  }

  serialize(context) {
    const { write } = context;

    write(this.collectProps);
    write(this.elementNameSet);
    write(this.componentNameSet);

    super.serialize(context);
  }

  deserialize(context) {
    const { read } = context;

    this.collectProps = read();
    this.elementNameSet = read();
    this.componentNameSet = read();

    if (!isEmpty(this.collectProps)) {
      for (const key in this.collectProps) {
        const attrs = componentConfig.thirdPartyComponents.get(key);
        const value = this.collectProps[key];

        if (!attrs) continue;

        value.split('|').forEach((item) => {
          attrs.add(item);
        });
      }
    }

    for (const elementName of this.elementNameSet) {
      elementNameSet.add(elementName);
    }
    for (const componentName of this.componentNameSet) {
      componentNameSet.add(componentName);
    }

    return super.deserialize(context);
  }
}

export default class NormalModule extends BaseNormalModule {
  name: string;
  miniType: META_TYPE;
  // 在 TaroLoadChunksPlugin 用于判断是否为独立分包，来添加 common、runtime 和 vendor 头部引用
  isNativePage?: boolean;

  constructor(data) {
    super(data);
    this.name = data.name;
    this.miniType = data.miniType;
    this.isNativePage = data.isNativePage || false;
  }

  serialize(context) {
    const { write } = context;
    write(this.name);
    write(this.miniType);
    write(this.isNativePage);
    super.serialize(context);
  }

  deserialize(context) {
    const { read } = context;
    this.name = read();
    this.miniType = read();
    this.isNativePage = read();
    super.deserialize(context);
  }
}

webpack.util.serialization.register(
  NormalModule,
  '@ice/app/esm/tasks/miniapp/webpack/plugins/NormalModule',
  'NormalModule',
  {
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
  },
);

webpack.util.serialization.register(
  BaseNormalModule,
  '@ice/app/esm/tasks/miniapp/webpack/plugins/BaseNormalModule',
  'BaseNormalModule',
  {
    serialize(obj, context) {
      obj.serialize(context);
    },
    deserialize(context) {
      const obj = new BaseNormalModule({
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
  },
);
