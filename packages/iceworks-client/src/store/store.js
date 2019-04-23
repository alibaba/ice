import Model from './model';

export default class Store {
  models = {};

  registerModel(namespace, config) {
    if (this.models[namespace]) {
      throw new Error(`Please do not repeat create model: ${namespace}.`);
    }

    this.models[namespace] = new Model(config);
    return this.models[namespace];
  }

  getModel(namespace) {
    const model = this.models[namespace];
    if (!model) {
      throw new Error(`Not found the model：${namespace}`);
    }
    return model;
  }

  useModel(namespace) {
    return this.getModel(namespace).useModel();
  }
}
