import * as React from 'react';
import IceContainer from '@icedesign/container';
import { List, AutoSizer } from 'react-virtualized';
import './InfiniteScrollList.scss';
import data from './data';

export default class InfiniteScrollList extends React.PureComponent {
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

  render() {
    const {
      listHeight,
      listRowHeight,
      overscanRowCount,
      rowCount,
      scrollToIndex,
    } = this.state;

    return (
      <IceContainer>
        <div className="InfiniteScrollList">
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref="List"
                className="List"
                height={listHeight}
                overscanRowCount={overscanRowCount}
                noRowsRenderer={this._noRowsRenderer}
                rowCount={rowCount}
                rowHeight={listRowHeight}
                rowRenderer={this._rowRenderer}
                scrollToIndex={scrollToIndex}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      </IceContainer>
    );
  }

  _getDatum(index) {
    const { list } = data;
    return list[index % list.length];
  }

  _noRowsRenderer = () => {
    return <div className="noRows">No rows</div>;
  };

  _rowRenderer = ({ index, isScrolling, key, style }) => {
    const { showScrollingPlaceholder } = this.state;

    if (showScrollingPlaceholder && isScrolling) {
      return (
        <div className="row isScrollingPlaceholder" key={key} style={style}>
          Scrolling...
        </div>
      );
    }

    const datum = this._getDatum(index);

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
}
