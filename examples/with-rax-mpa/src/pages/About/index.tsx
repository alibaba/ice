import { createElement, PureComponent } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import './index.css';

class About extends PureComponent {
  public render() {
    return (
      <View className="about">
        <Text className="title">About Page!!!</Text>
        <Text className="info" onClick={() => (this.props as any).history.push('/')}>Go Home</Text>
      </View>
    );
  }
}

export default About;
