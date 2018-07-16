import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class WysiwygEditor extends Component {
  static displayName = 'WysiwygEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          editorStyle={styles.editorContent}
          onEditorStateChange={this.onEditorStateChange}
        />
      </IceContainer>
    );
  }
}

const styles = {
  editorContent: {
    minHeight: '300px',
  },
};
