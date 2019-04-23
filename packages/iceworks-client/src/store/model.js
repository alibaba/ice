import { useState, useEffect } from 'react';
import shallowequal from 'shallowequal';

const isPromise = (fn) => {
  if (fn instanceof Promise) {
    return true;
  }
  if (typeof fn === 'object' && typeof fn.then === 'function') {
    return true;
  }
  return false;
};

class Model {
  constructor(config) {
    const { state = {}, reducers = {} } = config;
    this.state = state;
    this.reducers = reducers;

    this.isChanged = false;
    this.queue = [];

    this.methods = {};
    Object.keys(this.reducers).forEach((type) => {
      this.methods[type] = this.createMethod(type);
    });
  }

  useModel = () => {
    const [, setState] = useState();
    useEffect(() => {
      const index = this.queue.length;
      this.queue.push(setState);
      return () => {
        this.queue.splice(index, 1);
      };
    });
    return [{ ...this.methods, state: this.state }];
  }

  createMethod(type) {
    const method = (...args) => {
      this.dispatch({ type, payload: args });
      if (method.loading) {
        method.promise
          .then(payload => this.dispatch({ type, payload, loading: false }))
          .catch(() => this.dispatch({ type, loading: false }));
        return method.promise;
      }
      return this.state;
    };
    method.loading = false;
    return method;
  }

  dispatch(action) {
    const newState = { ...this.state, ...this.getNextState(action) };
    if (!this.shouldUpdate(newState)) {
      return;
    }

    // 子组件根据 Object.is 判断是否需要更新组件，所以当数据变化或者 loading 改变时，必须改变 this.state 的引用
    this.state = newState;
    const queue = [].concat(this.queue);
    this.queue = [];
    queue.forEach(setState => setState(newState));
  }

  getNextState(action) {
    const { type, payload = {}, loading } = action;
    const reducer = this.reducers[type];
    const method = this.methods[type];

    if (!reducer) {
      return this.state;
    }

    // 异步结束
    if (loading === false && method.loading) {
      method.loading = false;
      this.isChanged = true;
      return payload;
    }

    // 处理 action
    const newState = reducer.apply(this, payload) || {};
    if (!isPromise(newState)) {
      return newState;
    }

    // 异步的 action 添加 loading 和 promise 两个属性
    method.loading = true;
    method.promise = newState;
    this.isChanged = true;

    return this.state;
  }

  shouldUpdate(newState) {
    if (this.isChanged) {
      this.isChanged = false;
      return true;
    }

    return shallowequal(this.state, newState);
  }
}

export default Model;
