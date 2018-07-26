import React, { PureComponent } from 'react';
import IceContainer from '@icedesign/container';
import { List, AutoSizer } from 'react-virtualized';
import './InfiniteScrollList.scss';
import data from './data';

export default class InfiniteScrollList extends PureComponent {
  static displayName = 'InfiniteScrollList';

  constructor(props) {
    super(props);

    this.state = {
      listHeight: 300,
      listRowHeight: 50,
      overscanRowCount: 10,
      rowCount: data.list.length,
      scrollToIndex: undefined,
      showScrollingPlaceholder: false,
    };
  }

  getDatum(index) {
    const { list } = data;
    return list[index % list.length];
  }

  noRowsRenderer = () => {
    return <div className="no-rows">No rows</div>;
  };

  rowRenderer = ({ index, isScrolling, key, style }) => {
    const { showScrollingPlaceholder } = this.state;

    if (showScrollingPlaceholder && isScrolling) {
      return (
        <div className="row is-scrolling-placeholder" key={key} style={style}>
          Scrolling...
        </div>
      );
    }

    const datum = this.getDatum(index);

    return (
      <div className="row" key={key} style={style}>
        <div
          className="letter"
          style={{
            backgroundColor: datum.color,
          }}
        >
          {datum.name.charAt(0)}
        </div>
        <div>
          <div className="name">{datum.name}</div>
          <div className="index">This is row {index}</div>
        </div>
      </div>
    );
  };

  render() {
    const {
      listHeight,
      listRowHeight,
      overscanRowCount,
      rowCount,
      scrollToIndex,
    } = this.state;

    return (
      <IceContainer className="infinite-scroll-list">
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              ref="List"
              className="list"
              height={listHeight}
              overscanRowCount={overscanRowCount}
              noRowsRenderer={this.noRowsRenderer}
              rowCount={rowCount}
              rowHeight={listRowHeight}
              rowRenderer={this.rowRenderer}
              scrollToIndex={scrollToIndex}
              width={width}
            />
          )}
        </AutoSizer>
      </IceContainer>
    );
  }
}
