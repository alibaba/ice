import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import './index.css';

export default function About(props) {
  const { history } = props;
  return (
    <View className="about">
      <Text className="title">About Page!!!</Text>
      <Text className="info" onClick={() => history.push('/')}>Go Home</Text>
    </View>
  );
}
