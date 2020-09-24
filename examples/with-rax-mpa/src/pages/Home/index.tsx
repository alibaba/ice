import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Logo from '@/components/Logo';

import './index.css';

export default function Home(props) {
  console.log(props);
  return (
    <View className="home">
      <Logo />
      <a href="/#/about">1321321</a>
      <Text className="title">Welcome to Your Rax App!!!</Text>
      <Text className="info">More information about Rax</Text>
    </View>
  );
}
