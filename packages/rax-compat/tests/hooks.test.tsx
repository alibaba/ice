/**
 * @vitest-environment jsdom
 */

import { expect, it, describe, vi } from 'vitest';
import React from 'react';
import { render, renderHook } from '@testing-library/react';
import {
  useState,
  useEffect,
  useLayoutEffect,
  createContext,
  useContext,
  useRef,
} from '../src/hooks';

describe('hooks', () => {
  it('useState', () => {
    function App() {
      const [state] = useState({ text: 'text' });
      expect(state.text).toBe('text');
      return <div>{state.text}</div>;
    }

    render(<App />);
  });

  it('useState reset value', () => {
    function App() {
      const [loading, setLoading] = useState(false);
      useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          expect(loading).toBe(false);
        }, 1);
        // Expect useEffect to execute once
        // eslint-disable-next-line
      }, []);
      return <div>{loading ? 'loading...' : 'load end'}</div>;
    }

    render(<App />);
  });

  it('useState can be function', () => {
    function App() {
      const [value] = useState(() => 'useState');
      useEffect(() => {
        setTimeout(() => {
          expect(value).toBe('useState');
        }, 1);
        // Expect useEffect to execute once
        // eslint-disable-next-line
      }, []);
      return <div>{value}</div>;
    }

    render(<App />);
  });

  it('useState update value', () => {
    const { result, rerender } = renderHook(() => useState(0));
    expect(result.current[0]).toEqual(0);

    result.current[1](1);
    rerender();
    expect(result.current[0]).toEqual(1);

    result.current[1]((count) => {
      expect(count).toEqual(1);
      return count + 10;
    });
    rerender();
    expect(result.current[0]).toEqual(11);
  });

  it('useEffect', () => {
    let useEffectFunc = vi.spyOn({
      func: () => {
        expect(useEffectFunc).toHaveBeenCalled();
      },
    }, 'func');
    function App() {
      useEffect(useEffectFunc, []);

      return <div>useEffect</div>;
    }

    render(<App />);
  });

  it('useLayoutEffect', () => {
    let useEffectFunc = vi.spyOn({
      func: () => {
        expect(useEffectFunc).toHaveBeenCalled();
      },
    }, 'func');
    function App() {
      useLayoutEffect(useEffectFunc, []);

      return <div>useEffect</div>;
    }

    render(<App />);
  });

  it('useContext', () => {
    const Context = createContext({
      theme: 'dark',
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
      });
      return (
        <>
          <input ref={inputEl} type="text" />
        </>
      );
    }

    render(<TextInputWithFocusButton />);
  });
});
