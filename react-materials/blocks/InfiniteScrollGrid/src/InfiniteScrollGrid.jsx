import cn from 'classnames';
import React, { PureComponent } from 'react';

import './InfiniteScrollGrid.scss';
import { Grid, AutoSizer } from 'react-virtualized';
import IceContainer from '@icedesign/container';

const data = {
  list: [
    {
      name: 'Peter Brimer',
      color: 'rgb(244, 67, 54)',
      random: 'r:0, c:3',
    },
    {
      name: 'Tera Gaona',
      color: 'rgb(63, 81, 181)',
      random: 'r:0, c:3',
    },
    {
      name: 'Kandy Liston',
      color: 'rgb(76, 175, 80)',
      random: 'r:0, c:3',
    },
  ],
};

export default class InfiniteScrollGrid extends PureComponent {
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

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex === 0) {
      return this.renderLeftSideCell({ columnIndex, key, rowIndex, style });
    } else {
      return this.renderBodyCell({ columnIndex, key, rowIndex, style });
    }
  };

  getColumnWidth = ({ index }) => {
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

  getDatum(index) {
    const { list } = data;

    return list[index % list.length];
  }

  getRowClassName = (row) => {
    return row % 2 === 0 ? 'even-row' : 'odd-row';
  };

  noContentRenderer = () => {
    return <div className="no-cells">No cells</div>;
  };

  renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    const rowClass = this.getRowClassName(rowIndex);
    const datum = this.getDatum(rowIndex);

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
      'centered-cell': columnIndex > 2,
    });

    return (
      <div className={classNames} key={key} style={style}>
        {content}
      </div>
    );
  };

  renderLeftSideCell = ({ key, rowIndex, style }) => {
    const datum = this.getDatum(rowIndex);

    const classNames = cn('cell', 'letter-cell');

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
      <IceContainer className="infinite-scroll-grid">
        <AutoSizer disableHeight>
          {({ width }) => (
            <Grid
              cellRenderer={this.cellRenderer}
              className="BodyGrid"
              columnWidth={this.getColumnWidth}
              columnCount={columnCount}
              height={height}
              noContentRenderer={this.noContentRenderer}
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
}
