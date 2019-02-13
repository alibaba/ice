import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import { Button } from '@alifd/next';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './GridLayout.scss';

function random(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

function generateLayout() {
  const data = [...Array(25).keys()];

  return data.map((item, i) => {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05,
    };
  });
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class BasicGridLayout extends Component {
  static displayName = 'BasicGridLayout';

  static defaultProps = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: generateLayout(),
  };

  state = {
    currentBreakpoint: 'lg',
    compactType: 'vertical',
    mounted: false,
    layouts: { lg: this.props.initialLayout },
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM() {
    return this.state.layouts.lg.map((l, i) => {
      return (
        <div key={i} className={l.static ? 'static' : ''}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  }

  onBreakpointChange = (breakpoint) => {
    this.setState({
      currentBreakpoint: breakpoint,
    });
  };

  onCompactTypeChange = () => {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === 'horizontal'
        ? 'vertical'
        : oldCompactType === 'vertical'
          ? null
          : 'horizontal';
    this.setState({ compactType });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  onNewLayout = () => {
    this.setState({
      layouts: { lg: generateLayout() },
    });
  };

  render() {
    var layout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
      { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    ];

    return (
      <IceContainer>
        <div style={styles.groupButton}>
          <Button type="normal" onClick={this.onCompactTypeChange}>
            Change Compaction Type
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={this.onNewLayout}
          >
            Generate New Layout
          </Button>
        </div>
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          isResizable={false}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </IceContainer>
    );
  }
}

const styles = {
  groupButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
