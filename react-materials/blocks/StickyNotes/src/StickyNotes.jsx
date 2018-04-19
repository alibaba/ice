import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ReactStickies from './ReactStickies';

export default class StickyNotes extends Component {
  static displayName = 'StickyNotes';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  onSave = () => {
    // Make sure to delete the editorState before saving to backend
    const notes = this.state.notes;
    notes.forEach((note) => {
      delete note.editorState;
    });
    // Make service call to save notes
    // Code goes here...
  };

  onChange = (notes) => {
    console.log('notes', notes);
    this.setState({
      // Update the notes state
      notes,
    });
  };

  render() {
    return (
      <div>
        <IceContainer title="待办事项">
          <div>
            <ReactStickies notes={this.state.notes} onChange={this.onChange} />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {};
