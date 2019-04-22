import Model from './model';

const models = {};

export function createModel(name, config) {
  if (models[name]) {
    throw new Error(`Please do not repeat create model: ${name}.`);
  }

  models[name] = new Model(config);
  return models[name];
}

export function getModel(name) {
  const model = models[name];
  if (!model) {
    throw new Error(`Not found the model：${name}`);
  }
  return model;
}

export function useModel(name) {
  return getModel(name).useModel();
}
