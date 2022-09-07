
import React from 'react';
import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';
import createPortal from '../src/create-portal';

describe('createPortal', () => {
  it('basic', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const Portal = ({ children }) => {
      return createPortal(children, div);
    };

    function App() {
      return (<div>
        <Portal>
          <text>Hello Rax</text>
        </Portal>
      </div>);
    }

    render(<App />);
    expect(div.childNodes.length).toBe(1);
  });
});
