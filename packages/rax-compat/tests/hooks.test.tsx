import { expect, it, describe, vi } from 'vitest';
import React from 'react';
import {
  useState,
  useEffect,
  useLayoutEffect,
  createContext,
  useContext,
  useRef,
} from '../src/hooks';
import { render } from '@testing-library/react';

describe('hooks', () => {
  it('useState', () => {
    function App() {
      const [state, setState] = useState({ text: 'text' });
      expect(state.text).toBe('text');
      return <div>{state.text}</div>;
    }

    render(<App />);
  });

  it('useEffect', () => {
    let useEffectFunc = vi.spyOn({
      func: () => {
        expect(useEffectFunc).toHaveBeenCalled();
      }
    }, 'func')
    function func() {}
    function App() {
      useEffect(func, []);
      
      return <div>useEffect</div>;
    }

    render(<App />);
  });

  it('useLayoutEffect', () => {
    let useEffectFunc = vi.spyOn({
      func: () => {
        expect(useEffectFunc).toHaveBeenCalled();
      }
    }, 'func')
    function func() {}
    function App() {
      useLayoutEffect(func, []);
      
      return <div>useEffect</div>;
    }

    render(<App />);
  });

  it('useContext', () => {
    const Context = createContext({
      theme: 'dark'
    });
    function App() {
      const context = useContext(Context);
      return <div>{context.theme}</div>;
    }

    const wrapper = render(<App />);
    wrapper.findAllByText('dark').then((res) => {
      expect(res.length).toBe(1);
    });    
  });

  it('useRef', () => {
    function TextInputWithFocusButton() {
      const inputEl = useRef(null);
      useEffect(() => {
        expect(inputEl.current).instanceOf(Element);
      })
      return (
      <>
        <input ref={inputEl} type="text" />
      </>
      );
    }

    render(<TextInputWithFocusButton />);
  });

});
