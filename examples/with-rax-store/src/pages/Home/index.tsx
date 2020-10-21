import { createElement } from 'rax';
import { usePageShow, usePageHide } from 'rax-app';
import View from 'rax-view';
import Text from 'rax-text';
import Logo from '@/components/Logo';
import appStore from '@/store';
import store from './store';

import './index.css';

export default function Home(props) {
  const { history } = props;
  const [state, dispatchers] = store.useModel('counter');
  const [appState, appDispatchers] = appStore.useModel('counter');

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
      <Text className="info" onClick={appDispatchers.increment}>App Count: {appState.count}</Text>
      <Text className="info" onClick={dispatchers.increment}>Home Count: {state.count}</Text>
      <Text className="info" onClick={() => history.push('/about')}>Go About</Text>
    </View>
  );
}
