import React, { PureComponent } from 'react';
import { store as appStore } from 'ice';
import './index.css';

const { withModel } = appStore;

class About extends PureComponent {
  public render() {
    const { counter } = this.props;
    const [ state, dispatchers ] = counter;
    return (
      <div className="about">
        <p className="title">About Page!!!</p>
        <p onClick={dispatchers.decrement}>Count: {state.count}</p>
        <p className="info" onClick={() => this.props.history.push('/')}>Go Home</p>
      </div>
    );
  }
}

export default withModel('counter')(About);
