
import React from 'react';
import { expect, it, describe } from 'vitest';
import createPortal from '../src/create-portal';
import { render } from '@testing-library/react';

describe('createPortal', () => {
  it('basic', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const Portal = ({ children }) => {
      return createPortal(children, div);
    };
    
    function App() {
      return <div>
        <Portal>
          <text>Hello Rax</text>
        </Portal>
      </div>
    }

    const wrapper = render(<App />);
    const node = wrapper.queryByTestId('test');
    expect(div.childNodes.length).toBe(1);
  });
});