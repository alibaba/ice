import { createElement } from 'rax';
import { usePageShow, usePageHide } from 'raxapp';
import View from 'rax-view';
import Text from 'rax-text';
import Logo from '@/components/Logo';

import './index.css';

export default function Home(props) {
  const { history } = props;

  usePageShow(() => {
    console.log('page show...');
  });

  usePageHide(() => {
    console.log('page hide...');
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
