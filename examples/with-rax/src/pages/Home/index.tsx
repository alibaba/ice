import { createElement } from 'rax';
import { usePageShow, usePageHide } from 'rax-app';
import View from 'rax-view';
import Text from 'rax-text';
import Logo from '@/components/Logo';

import './index.css';

export default function Home(props) {
  const { history } = props;

  usePageShow(() => {
    console.log('home show...');
  });

  usePageHide(() => {
    console.log('home hide...');
  });

  return (
    <View className="home">
      <Logo />
      <Text className="title">Welcome to Your Rax App!!!</Text>
      <Text className="info">More information about Rax</Text>
      <Text className="info" onClick={() => history.push('/about')}>Go About</Text>
    </View>
  );
}
