import { createElement, PureComponent } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { withPageLifeCycle, store as appStore } from 'rax-app';

import './index.css';

const { withModel } = appStore;

class About extends PureComponent {
  public onShow() {
    console.log('about show...');
  }

  public onHide() {
    console.log('about hide...');
  }

  public render() {
    const { counter } = this.props;

    const [ state, dispatchers ] = counter;
    return (
      <View className="about">
        <Text className="title">About Page!!!</Text>
        <Text onClick={dispatchers.decrement}>Count: {state.count}</Text>
        <Text className="info" onClick={() => this.props.history.push('/')}>Go Home</Text>
      </View>
    );
  }
}

export default withModel('counter')(withPageLifeCycle(About));
