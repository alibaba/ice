import { expect, it, describe } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import Fragment from '../src/fragment';

describe('fragment', () => {
  it('basic', () => {
    function App() {
      return (<Fragment>
        <header>A heading</header>
        <footer>A footer</footer>
      </Fragment>);
    }

    const wrapper = render(<App />);
    expect(wrapper.container.childNodes.length).toBe(2);
  });
});
