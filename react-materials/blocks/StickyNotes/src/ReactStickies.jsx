// fork from https://github.com/ajainvivek/react-stickies and remove draft-js

import React, { Component } from 'react';
import { Input } from '@icedesign/base';
import moment from 'moment';
import ContentEditable from './ContentEditable';
import './stick-styles.scss';

const WidthProvider = require('react-grid-layout').WidthProvider;
let ResponsiveReactGridLayout = require('react-grid-layout').Responsive;

ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);

/**
 * @method: guid
 * @desc: Generates unique guid
 * */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCounter: 0,
      notes: props.notes ? props.notes : [],
      colors: props.colors || ['#FBE4BE', '#F7D1D1', '#E4FABC', '#CAE0FA'],
      dateFormat: props.dateFormat || 'YYYY-MM-DD hh:mm:ss',
    };
    this.createBlankNote = this.createBlankNote.bind(this);
    this.renderNote = this.renderNote.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }
  componentDidMount() {
    if (this.props.notes && !this.props.notes.length) {
      this.createBlankNote();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notes && nextProps.notes.length) {
      this.setState({
        notes: nextProps.notes,
      });
    }
    this.setState({
      colors: nextProps.colors || ['#FBE4BE', '#F7D1D1', '#E4FABC', '#CAE0FA'],
      dateFormat: nextProps.dateFormat || 'YYYY-MM-DD hh:mm:ss',
    });
  }

  generateRandomColors() {
    const colors = this.state.colors;
    return colors[Math.floor(Math.random() * (colors.length - 1))];
  }

  generateRandomDegree = (max, min) => {
    return `${Math.floor(Math.random() * ((max - min) + 1)) + min}deg`;
  };

  handleTitleChange(html, currentNote) {
    const notes = this.state.notes;
    notes.forEach((note) => {
      if (currentNote.id === note.id) {
        note.title = html.target.value;
      }
    });
    this.setState(
      {
        notes,
      },
      () => {
        if (this.props.onTitleChange) {
          this.props.onTitleChange(html, currentNote);
        }
      }
    );
  }

  onChange(textValue, currentNote) {
    const notes = this.state.notes;
    const dateFormat = this.state.dateFormat;
    notes.forEach((note) => {
      if (currentNote.id === note.id) {
        note.textValue = textValue;
        note.timeStamp = moment().format(dateFormat);
      }
    });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.notes, 'update');
    }
  }

  deleteNote(currentNote) {
    const notes = this.state.notes;
    notes.forEach((note, index) => {
      if (currentNote.id === note.id) {
        notes.splice(index, 1);
      }
    });
    this.setState(
      {
        notes,
      },
      () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.notes, 'delete');
          if (typeof this.props.onDelete === 'function') {
            this.props.onDelete(currentNote);
          }
        }
      }
    );
  }
  createBlankNote() {
    const dateFormat = this.state.dateFormat;
    const grid = this.props.grid || {};
    const uid = guid();
    const note = {
      grid: {
        i: `${uid}`,
        x: (this.state.notes.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: grid.w || 2,
        h: grid.h || 2,
      },
      id: uid,
      textValue: '',
      title: 'Title',
      color: this.generateRandomColors(),
      degree: this.generateRandomDegree(-2, 2),
      timeStamp: moment().format(dateFormat),
      contentEditable: true,
    };
    this.setState({
      // Add a new item. It must have a unique key!
      notes: this.state.notes.concat(note),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
    });
    if (typeof this.props.onAdd === 'function') {
      this.props.onAdd(note);
    }
  }
  onLayoutChange(layout) {
    const notes = this.state.notes;
    notes.forEach((note) => {
      layout.forEach((grid) => {
        if (grid.i === note.id) {
          note.grid = grid;
        }
      });
    });
    this.setState(
      {
        notes,
      },
      () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.notes, 'layout');
          if (typeof this.props.onLayoutChange === 'function') {
            this.props.onLayoutChange(layout);
          }
        }
      }
    );
  }
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      // breakpoint,
      cols,
    });
  }
  renderNote(note) {
    const closeStyle = Object.assign(
      {},
      {
        display: this.state.notes.length === 1 ? 'none' : 'block',
      },
      this.props.closeStyle || {}
    );
    const addStyle = this.props.addStyle || {};
    const closeIcon = this.props.closeIcon || '';
    const addIcon = this.props.addIcon || '';
    const noteStyle = Object.assign(
      {},
      {
        background: note.color,
        transform: note.degree,
      },
      this.props.noteStyle || {}
    );
    const noteHeaderStyle = Object.assign(
      {},
      {
        display: this.props.header === false ? 'none' : 'block',
      },
      this.props.noteHeaderStyle || {}
    );
    const noteBodyStyle = this.props.noteBodyStyle || {};
    const noteTitleStyle = Object.assign(
      {},
      {
        display: this.props.title === false ? 'none' : 'block',
      },
      this.props.noteTitleStyle || {}
    );
    const noteFooterStyle = Object.assign(
      {},
      {
        display: this.props.footer === false ? 'none' : 'block',
      },
      this.props.noteFooterStyle || {}
    );
    const i = note.grid.add ? '+' : note.grid.i;
    const grid = note.grid;
    grid.y = grid.y || Infinity;
    return (
      <div key={i} data-grid={grid}>
        <aside
          className={`note-wrap note ${this.props.tape ? 'tape' : ''}`}
          style={noteStyle}
        >
          <div className="note-header" style={noteHeaderStyle}>
            <div
              className={`${addIcon ? '' : 'add'}`}
              onClick={this.createBlankNote}
              style={addStyle}
            >
              {addIcon}
            </div>
            <div className="title" style={noteTitleStyle}>
              <ContentEditable
                html={note.title}
                onChange={(html) => this.handleTitleChange(html, note)}
              />
            </div>
            <div
              className={`${closeIcon ? '' : 'close'}`}
              style={closeStyle}
              onClick={() => this.deleteNote(note)}
            >
              {closeIcon}
            </div>
          </div>
          <div className="note-body" style={noteBodyStyle}>
            <Input
              multiple
              value={note.textValue}
              onChange={(textValue) => this.onChange(textValue, note)}
              placeholder="添加待办事项和说明"
            />
          </div>
          <div className="note-footer" style={noteFooterStyle}>
            {note.timeStamp}
          </div>
        </aside>
      </div>
    );
  }
  render() {
    const gridProps = this.props.grid || {};
    const grid = {
      className: 'layout',
      cols: gridProps.cols || { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: gridProps.rowHeight || 100,
      isDraggable:
        gridProps.isDraggable === undefined ? true : gridProps.isDraggable,
      isResizable:
        gridProps.isResizable === undefined ? true : gridProps.isResizable,
      useCSSTransforms:
        gridProps.useCSSTransforms === undefined
          ? true
          : gridProps.useCSSTransforms,
      margin: gridProps.margin,
    };
    const wrapperStyle = this.props.wrapperStyle || {};
    return (
      <div className="react-stickies-wrapper clearfix" style={wrapperStyle}>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...grid}
        >
          {this.state.notes.map(this.renderNote)}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
