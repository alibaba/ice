import { createElement, PureComponent } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { getSearchParams, withPageLifeCycle, ErrorBoundary } from 'rax-app';
import BuggyCounter from '@/components/BuggyCounter';

import './index.css';

@withPageLifeCycle
class About extends PureComponent {
  public componentDidMount() {
    console.log('about search params', getSearchParams());
  }

  public onShow() {
    console.log('about show...');
  }

  public onHide() {
    console.log('about hide...');
  }

  public render() {
    return (
      <View className="about">
        <Text className="title">About Page</Text>
        <Text className="info" onClick={() => (this.props as any).history.push('/')}>Go Home</Text>
          <BuggyCounter />
      </View>
    );
  }
}

export default About;
