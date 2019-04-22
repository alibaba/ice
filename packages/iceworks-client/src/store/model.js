import { useState, useEffect } from 'react';

const isPromise = (fn) => {
  if (fn instanceof Promise) return true;
  if (typeof fn === 'object' && typeof fn.then === 'function') return true;
  return false;
};

class Model {
  constructor(config) {
    const { state = {}, reducers = {} } = config;
    this.state = state;
    this.reducers = reducers;

    // state 是否发生变化，loading 是否发生变化
    this.isChanged = false;
    // 发布订阅的队列
    this.queue = [];

    this.methods = {};
    Object.keys(this.reducers).forEach((type) => {
      this.methods[type] = this.createMethod(type);
    });
  }

  useModel = () => {
    const [, setState] = useState();
    // 使用useEffect实现发布订阅
    useEffect(() => {
      const index = this.queue.length;
      this.queue.push(setState);
      return () => this.queue.splice(index, 1);
    });
    return [this.state, this.methods];
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
    if (!this.shouldUpdate(newState)) return;
    // 子组件根据 Object.is 判断是否需要更新组件，所以当数据变化或者loading改变时，必须改变this.state的引用
    this.state = newState;
    const queue = [].concat(this.queue);
    this.queue.length = 0;
    // 通知数据变化
    queue.forEach(setState => setState(this.state));
  }

  getNextState(action) {
    const { type, payload = {}, loading } = action;
    const reducer = this.reducers[type];
    const method = this.methods[type];

    // 没有对应的actionType
    if (!reducer) return this.state;
    // 异步结束
    if (loading === false && method.loading) {
      method.loading = false;
      this.isChanged = true;
      return payload;
    }
    // 处理 action
    const newState = reducer.apply(this, payload) || {};
    if (!isPromise(newState)) return newState; // 同步reducer直接返回
    // 异步的 action，添加loading和promise两个属性
    method.loading = true;
    method.promise = newState;
    this.isChanged = true;

    return this.state;
  }

  getState() {
    return this.state;
  }

  // 是否应该更新state，只做一层浅比较
  shouldUpdate(newState) {
    if (this.isChanged) {
      this.isChanged = false;
      return true;
    }

    if (this.state === newState) return false;
    const keys = Object.keys(newState);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (this.state[key] !== newState[key]) return true;
    }
    return false;
  }
}

export default Model;
