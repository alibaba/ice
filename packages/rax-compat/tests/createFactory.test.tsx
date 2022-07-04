import { expect, it, describe } from 'vitest';
import { Component } from '../src/index';
import createFactory from '../src/create-factory';
import { render } from '@testing-library/react';

describe('createFactory', () => {
  it('basic', () => {
    class CustomComponent extends Component {
      text: string = '';

      render() {
        return <div>{this.props.text}</div>;
      }
    }

    const factory = createFactory("div");
    const div = factory(null,'div node');

    const wrapper = render(div);
    const node = wrapper.queryByTestId('div');
    let res = wrapper.getAllByText('div node');

    expect(res.length).toBe(1);
  });
});
