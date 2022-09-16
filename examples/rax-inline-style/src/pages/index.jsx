import { createElement, useEffect, useRef } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Logo from '@/components/Logo';
import Title from '@/components/Title';
import './index.css';

export default function Home() {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      console.log('ref for View', ref);
    }
  }, []);
  return (
    <View
      ref={ref}
      className="homeContainer"
      style={{
        width: '750rpx',
      }}
      onAppear={() => { console.log('view appear'); }}
    >
      <Logo uri="//gw.alicdn.com/tfs/TB1MRC_cvb2gK0jSZK9XXaEgFXa-1701-1535.png" />
      <Title />
      <Text className="homeInfo">More information about Rax</Text>
      <Text className="homeInfo">Visit https://rax.js.org</Text>
    </View>
  );
}
