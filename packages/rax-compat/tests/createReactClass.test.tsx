/**
 * @vitest-environment jsdom
 */

import { expect, it, describe } from 'vitest';
import * as React from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import createReactClass from '../src/create-class';

describe('createClass', () => {
  it('the simplest usage', () => {
    const ReactClass = createReactClass({
      name: '',
      id: '',
      render: function () {
        return <div data-testid={this.props.id}>Hello, {this.props.name}</div>;
      },
    });

    // @ts-ignore
    const wrapper = render(<ReactClass id="reactClassId" name="raxCompat" />);
    let res = wrapper.getAllByTestId('reactClassId');

    expect(res.length).toBe(1);
  });

  it('should copy `displayName` onto the Constructor', () => {
    const TestComponent = createReactClass({
      displayName: 'TestComponent',
      render: function () {
        return <div />;
      },
    });

    expect(TestComponent.displayName).toBe('TestComponent');
  });

  it('should support statics', () => {
    const Component = createReactClass({
      statics: {
        abc: 'def',
        def: 0,
        ghi: null,
        jkl: 'mno',
        pqr: function () {
          return this;
        },
      },

      render: function () {
        return <span />;
      },
    });

    // @ts-ignore
    expect(Component.abc).toBe('def');
    // @ts-ignore
    expect(Component.def).toBe(0);
    // @ts-ignore
    expect(Component.ghi).toBe(null);
    // @ts-ignore
    expect(Component.jkl).toBe('mno');
    // @ts-ignore
    expect(Component.pqr()).toBe(Component);
  });

  it('should work with object getInitialState() return values', () => {
    const Component = createReactClass({
      getInitialState: function () {
        return {
          occupation: 'clown',
        };
      },
      render: function () {
        return <span data-testid="testerClown">{this.state.occupation}</span>;
      },
    });

    const instance = render(<Component />);
    const el = instance.getByTestId('testerClown');
    expect(el.innerHTML).toEqual('clown');
  });

  it('renders based on context getInitialState', () => {
    const Foo = createReactClass({
      contextTypes: {
        className: PropTypes.string,
      },
      getInitialState() {
        return { className: this.context.className };
      },
      render() {
        return <span className={this.state.className} data-testid="testerFoo" />;
      },
    });

    const Outer = createReactClass({
      childContextTypes: {
        className: PropTypes.string,
      },
      getChildContext() {
        return { className: 'foo' };
      },
      render() {
        return <Foo />;
      },
    });

    const instance = render(<Outer />);
    const el = instance.getByTestId('testerFoo');
    expect(el.className).toEqual('foo');
  });

  it('should support statics in mixins', () => {
    const Mixin = {
      statics: {
        foo: 'bar',
      },
    };
    const Component = createReactClass({
      mixins: [Mixin],

      statics: {
        abc: 'def',
      },

      render: function () {
        return <span />;
      },
    });

    render(<Component />);

    expect(Component.foo).toBe('bar');
    expect(Component.abc).toBe('def');
  });

  it('should include the mixin keys in even if their values are falsy', () => {
    const mixin = {
      keyWithNullValue: null,
      randomCounter: 0,
    };

    const Component = createReactClass({
      mixins: [mixin],
      componentDidMount: function () {
        expect(this.randomCounter).toBe(0);
        expect(this.keyWithNullValue).toBeNull();
      },
      render: function () {
        return <span />;
      },
    });

    render(<Component />);
  });

  it('should work with a null getInitialState return value and a mixin', () => {
    let Component;

    let currentState;

    const Mixin = {
      getInitialState: function () {
        return { foo: 'bar' };
      },
    };
    Component = createReactClass({
      mixins: [Mixin],
      getInitialState: function () {
        return null;
      },
      render: function () {
        currentState = this.state;
        return <span />;
      },
    });

    render(<Component />);
    expect(currentState).toEqual({ foo: 'bar' });
    currentState = null;

    // Also the other way round should work
    const Mixin2 = {
      getInitialState: function () {
        return null;
      },
    };
    Component = createReactClass({
      mixins: [Mixin2],
      getInitialState: function () {
        return { foo: 'bar' };
      },
      render: function () {
        currentState = this.state;
        return <span />;
      },
    });

    render(<Component />);
    expect(currentState).toEqual({ foo: 'bar' });
    currentState = null;

    // Multiple mixins should be fine too
    Component = createReactClass({
      mixins: [Mixin, Mixin2],
      getInitialState: function () {
        return { x: true };
      },
      render: function () {
        currentState = this.state;
        return <span />;
      },
    });

    render(<Component />);
    expect(currentState).toEqual({ foo: 'bar', x: true });
    currentState = null;
  });

  it('should have bound the mixin methods to the component', () => {
    const mixin = {
      mixinFunc: function () {
        return this;
      },
    };

    const Component = createReactClass({
      mixins: [mixin],
      componentDidMount: function () {
        expect(this.mixinFunc()).toBe(this);
      },
      render: function () {
        return <span />;
      },
    });

    render(<Component />);
  });

  it('should support mixins with getInitialState()', () => {
    let currentState;
    const Mixin = {
      getInitialState: function () {
        return { mixin: true };
      },
    };
    const Component = createReactClass({
      mixins: [Mixin],
      getInitialState: function () {
        return { component: true };
      },
      render: function () {
        currentState = this.state;
        return <span />;
      },
    });
    render(<Component />);
    expect(currentState.component).toBeTruthy();
    expect(currentState.mixin).toBeTruthy();
  });

  it('should support merging propTypes and statics', () => {
    const MixinA = {
      propTypes: {
        propA: function () {},
      },
      componentDidMount: function () {
        this.props.listener('MixinA didMount');
      },
    };

    const MixinB = {
      mixins: [MixinA],
      propTypes: {
        propB: function () {},
      },
      componentDidMount: function () {
        this.props.listener('MixinB didMount');
      },
    };

    const MixinC = {
      statics: {
        staticC: function () {},
      },
      componentDidMount: function () {
        this.props.listener('MixinC didMount');
      },
    };

    const MixinD = {
      propTypes: {
        value: PropTypes.string,
      },
    };

    const Component = createReactClass({
      mixins: [MixinB, MixinC, MixinD],
      statics: {
        staticComponent: function () {},
      },
      propTypes: {
        propComponent: function () {},
      },
      componentDidMount: function () {
        this.props.listener('Component didMount');
      },
      render: function () {
        return <div />;
      },
    });

    const listener = function () {};
    render(<Component listener={listener} />);
    const instancePropTypes = Component.propTypes;

    expect('propA' in instancePropTypes).toBeTruthy();
    expect('propB' in instancePropTypes).toBeTruthy();
    expect('propComponent' in instancePropTypes).toBeTruthy();

    expect('staticC' in Component).toBeTruthy();
    expect('staticComponent' in Component).toBeTruthy();
  });
});

