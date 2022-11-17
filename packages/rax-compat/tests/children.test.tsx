/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { expect, it, describe } from 'vitest';
import { render } from '@testing-library/react';
import Children from '../src/children';

const arrText = ['hello', 'rax'];

describe('children', () => {
  it('should work with map', () => {
    function Hello({ children }) {
      return (<div data-testid="test">
        {
          Children.map(children, (child, i) => {
            if (i === 0) {
              return <span>{arrText[1]}</span>;
            }
            return child;
          })
        }
      </div>);
    }

    const instance = (
      <Hello>
        <span>{arrText[0]}</span>
        <span>{arrText[1]}</span>
      </Hello>
    );

    const wrapper = render(instance);
    const node = wrapper.queryByTestId('test');

    expect(node.children.item(0).textContent).toBe(node.children.item(0).textContent);
    expect(node.children.item(1).textContent).toBe(arrText[1]);
  });

  it('should work with forEach', () => {
    function Hello({ children }) {
      Children.forEach(children, (child, i) => {
        expect(child.type).toBe('span');
        expect(child.props.children).toBe(arrText[i]);
      });
      return children;
    }

    const instance = (
      <Hello>
        <span>{arrText[0]}</span>
        <span>{arrText[1]}</span>
      </Hello>
    );

    render(instance);
  });

  it('should work with count', () => {
    function Hello({ children }) {
      expect(Children.count(children)).toBe(arrText.length);
      return children;
    }

    const instance = (
      <Hello>
        <span>{arrText[0]}</span>
        <span>{arrText[1]}</span>
      </Hello>
    );

    render(instance);
  });

  it('should work with only', () => {
    let child = <span>{arrText[0]}</span>;
    function Hello({ children }) {
      expect(Children.only(children)).toBe(child);
      return children;
    }

    const instance = (
      <Hello>
        {
          child
        }
      </Hello>
    );

    render(instance);
  });

  it('should work with toArray', () => {
    function Hello({ children }) {
      expect(Children.toArray(children).length).toBe(arrText.length);
      return children;
    }

    const instance = (
      <Hello>
        <span>{arrText[0]}</span>
        <span>{arrText[1]}</span>
      </Hello>
    );

    render(instance);
  });

  it('should escape keys', () => {
    const zero = <div key="1" />;
    const one = <div key="1=::=2" />;
    const instance = (
      <div>
        {zero}
        {one}
      </div>
    );
    const mappedChildren = Children.map(
      instance.props.children,
      kid => kid,
    );
    expect(mappedChildren).toEqual([
      <div key=".$1" />,
      <div key=".$1=0=2=2=02" />,
    ]);
  });

  it('should combine keys when map returns an array', () => {
    const instance = (
      <div>
        <div key="a" />
        {false}
        <div key="b" />
        <p />
      </div>
    );
    const mappedChildren = Children.map(
      instance.props.children,
      // Try a few things: keyed, unkeyed, hole, and a cloned element.
      kid => [
        <span key="x" />,
        null,
        <span key="y" />,
        kid,
        kid && React.cloneElement(kid, { key: 'z' }),
        <hr />,
      ],
    );
    expect(mappedChildren.length).toBe(18);

    // <div key="a">
    expect(mappedChildren[0].type).toBe('span');
    expect(mappedChildren[0].key).toBe('.$a/.$x');
    expect(mappedChildren[1].type).toBe('span');
    expect(mappedChildren[1].key).toBe('.$a/.$y');
    expect(mappedChildren[2].type).toBe('div');
    expect(mappedChildren[2].key).toBe('.$a/.$a');
    expect(mappedChildren[3].type).toBe('div');
    expect(mappedChildren[3].key).toBe('.$a/.$z');
    expect(mappedChildren[4].type).toBe('hr');
    expect(mappedChildren[4].key).toBe('.$a/.5');

    // false
    expect(mappedChildren[5].type).toBe('span');
    expect(mappedChildren[5].key).toBe('.1/.$x');
    expect(mappedChildren[6].type).toBe('span');
    expect(mappedChildren[6].key).toBe('.1/.$y');
    expect(mappedChildren[7].type).toBe('hr');
    expect(mappedChildren[7].key).toBe('.1/.5');

    // <div key="b">
    expect(mappedChildren[8].type).toBe('span');
    expect(mappedChildren[8].key).toBe('.$b/.$x');
    expect(mappedChildren[9].type).toBe('span');
    expect(mappedChildren[9].key).toBe('.$b/.$y');
    expect(mappedChildren[10].type).toBe('div');
    expect(mappedChildren[10].key).toBe('.$b/.$b');
    expect(mappedChildren[11].type).toBe('div');
    expect(mappedChildren[11].key).toBe('.$b/.$z');
    expect(mappedChildren[12].type).toBe('hr');
    expect(mappedChildren[12].key).toBe('.$b/.5');

    // <p>
    expect(mappedChildren[13].type).toBe('span');
    expect(mappedChildren[13].key).toBe('.3/.$x');
    expect(mappedChildren[14].type).toBe('span');
    expect(mappedChildren[14].key).toBe('.3/.$y');
    expect(mappedChildren[15].type).toBe('p');
    expect(mappedChildren[15].key).toBe('.3/.3');
    expect(mappedChildren[16].type).toBe('p');
    expect(mappedChildren[16].key).toBe('.3/.$z');
    expect(mappedChildren[17].type).toBe('hr');
    expect(mappedChildren[17].key).toBe('.3/.5');
  });
});
