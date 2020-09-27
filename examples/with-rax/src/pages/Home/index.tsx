import { createElement } from 'rax';
import { usePageShow, usePageHide, getSearchParams } from 'rax-app';
import View from 'rax-view';
import Text from 'rax-text';
import Logo from '@/components/Logo';

import './index.css';

export default function Home(props) {
  const { history } = props;

  const searchParams = getSearchParams();

  console.log('home search params =>', searchParams);
  console.log('home page props =>', props);

  usePageShow(() => {
    console.log('home show...');
  });

  usePageHide(() => {
    console.log('home hide...');
  });

  return (
    <View className="home">
      <Logo />
      <Text className="title">{props.data.title}</Text>
      <Text className="info">{props.data.info}</Text>
      <Text className="info" onClick={() => history.push('/about?id=1')}>Go About</Text>
    </View>
  );
}

Home.getInitialProps = async () => {
  return {
    data: {
      title: 'Welcome to Your Rax App!!!',
      info: 'More information about Rax'
    }
  };
};
