import React from 'react';
import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';
import { Component, PureComponent, memo } from '../src/index';

describe('component', () => {
  it('Component should work', () => {
    class MyComponent extends Component {
      render() {
        return <div data-testid="componentId" >my component</div>;
      }
    }

    const wrapper = render(<MyComponent />);
    const node = wrapper.queryByTestId('componentId');

    expect(node.textContent).toBe('my component');
  });

  it('PureComponent should work', () => {
    class MyComponent extends PureComponent {
      render() {
        return <div data-testid="pureComponentId" >my component</div>;
      }
    }

    const wrapper = render(<MyComponent />);
    const node = wrapper.queryByTestId('pureComponentId');

    expect(node.textContent).toBe('my component');
  });

  it('memo should work', () => {
    const MyComponent = memo((props: { text: string; id: string }) => {
      return <div id={props.id}>{props.text}</div>;
    });

    const wrapper = render(<MyComponent id="" text="memo demo" />);
    const res = wrapper.queryAllByText('memo demo');

    expect(res.length).toBe(1);
  });
});
