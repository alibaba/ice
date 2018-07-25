import cn from 'classnames';
import * as React from 'react';

import './InfiniteScrollGrid.scss';
import { Grid, AutoSizer } from 'react-virtualized';
import IceContainer from '@icedesign/container';
import data from './data';

export default class InfiniteScrollGrid extends React.PureComponent {
  static displayName = 'InfiniteScrollGrid';

  constructor(props) {
    super(props);

    this.state = {
      columnCount: 1000,
      height: 300,
      overscanColumnCount: 0,
      overscanRowCount: 10,
      rowHeight: 40,
      rowCount: 1000,
      scrollToColumn: undefined,
      scrollToRow: undefined,
    };
  }

  render() {
    const {
      columnCount,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
      scrollToColumn,
      scrollToRow,
    } = this.state;

    return (
      <IceContainer className="InfiniteScrollGrid">
        <AutoSizer disableHeight>
          {({ width }) => (
            <Grid
              cellRenderer={this._cellRenderer}
              className="BodyGrid"
              columnWidth={this._getColumnWidth}
              columnCount={columnCount}
              height={height}
              noContentRenderer={this._noContentRenderer}
              overscanColumnCount={overscanColumnCount}
              overscanRowCount={overscanRowCount}
              rowHeight={rowHeight}
              rowCount={rowCount}
              scrollToColumn={scrollToColumn}
              scrollToRow={scrollToRow}
              width={width}
            />
          )}
        </AutoSizer>
      </IceContainer>
    );
  }

  _cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex === 0) {
      return this._renderLeftSideCell({ columnIndex, key, rowIndex, style });
    } else {
      return this._renderBodyCell({ columnIndex, key, rowIndex, style });
    }
  };

  _getColumnWidth = ({ index }) => {
    switch (index) {
      case 0:
        return 50;
      case 1:
        return 100;
      case 2:
        return 300;
      default:
        return 80;
    }
  };

  _getDatum(index) {
    const { list } = data;

    return list[index % list.length];
  }

  _getRowClassName = (row) => {
    return row % 2 === 0 ? 'evenRow' : 'oddRow';
  };

  _noContentRenderer = () => {
    return <div className="noCells">No cells</div>;
  };

  _renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    const rowClass = this._getRowClassName(rowIndex);
    const datum = this._getDatum(rowIndex);

    let content;

    switch (columnIndex) {
      case 1:
        content = datum.name;
        break;
      case 2:
        content = datum.random;
        break;
      default:
        content = `r:${rowIndex}, c:${columnIndex}`;
        break;
    }

    const classNames = cn(rowClass, 'cell', {
      centeredCell: columnIndex > 2,
    });

    return (
      <div className={classNames} key={key} style={style}>
        {content}
      </div>
    );
  };

  _renderLeftSideCell = ({ key, rowIndex, style }) => {
    const datum = this._getDatum(rowIndex);

    const classNames = cn('cell', 'letterCell');

    // Don't modify styles.
    // These are frozen by React now (as of 16.0.0).
    // Since Grid caches and re-uses them, they aren't safe to modify.
    style = {
      ...style,
      backgroundColor: datum.color,
    };

    return (
      <div className={classNames} key={key} style={style}>
        {datum.name.charAt(0)}
      </div>
    );
  };
}
