import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import IceContainer from '@icedesign/container';
import 'react-quill/dist/quill.snow.css';

export default class QuillRichTextEditor extends Component {
  static displayName = 'QuillRichTextEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      vaule: 'React Quill Rich Text Editor...',
      theme: 'snow',
    };
  }

  handleChange = (value) => {
    this.setState({
      vaule: value,
    });
  };

  render() {
    return (
      <IceContainer>
        <ReactQuill
          value={this.state.vaule}
          theme={this.state.theme}
          modules={QuillRichTextEditor.modules}
          formats={QuillRichTextEditor.formats}
          onChange={this.handleChange}
        >
          <div style={styles.editorArea} />
        </ReactQuill>
      </IceContainer>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
QuillRichTextEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
QuillRichTextEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

const styles = {
  editorArea: {
    minHeight: '300px',
  },
};
