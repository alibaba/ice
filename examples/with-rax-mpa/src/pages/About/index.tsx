import { createElement, PureComponent } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import './index.css';

class About extends PureComponent {
  public render() {
    return (
      <View className="about">
        <Text className="title">About Page</Text>
      </View>
    );
  }
}

export default About;
