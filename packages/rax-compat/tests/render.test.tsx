import React from 'react';
import { expect, it, describe } from 'vitest';
import { Component, render } from '../src/index';

describe('render', () => {
  it('basic', () => {
    class TextComponent extends Component {
      render() {
        return <div>render text</div>;
      }
    }
    const ele = <TextComponent />;
    expect(ele).toBe(render(ele, document.body));
  });
});
