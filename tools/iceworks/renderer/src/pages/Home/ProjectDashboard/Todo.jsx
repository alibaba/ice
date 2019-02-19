import { ipcRenderer } from 'electron';
import fs from 'fs';
import isBinaryFile from 'isbinaryfile';
import LineByLine from 'line-by-line';
import path from 'path';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { readdirSync } from '../../../lib/file-system';
import DashboardCard from '../../../components/DashboardCard';
import EmptyTips from '../../../components/EmptyTips';

function recursiveReaddirSync(dirPath, rootDir) {
  let list = [];
  let stats;
  const files = readdirSync(dirPath);
  const ignoreFiles = ['node_modules']

  files.forEach(function(file) {
    if (ignoreFiles.includes(file)) {
      return
    }
    let fullPath = path.join(dirPath, file);
    stats = fs.lstatSync(fullPath);
    if (stats.isDirectory()) {
      list = list.concat(recursiveReaddirSync(fullPath, rootDir));
    } else if (!isBinaryFile.sync(fullPath)) {
      list.push([path.relative(rootDir, fullPath), fullPath]);
    }
  });

  return list;
}

const lineLengthLimit = 1000;
const messageChecks = {
  note: {
    regex: /(?:^|[^:])\/[/*]\s*NOTE\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ✐ NOTE',
  },
  optimize: {
    regex: /(?:^|[^:])\/[/*]\s*OPTIMIZE\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ↻ OPTIMIZE',
  },
  todo: {
    regex: /(?:^|[^:])\/[/*]\s*TODO\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ✓ TODO',
  },
  hack: {
    regex: /(?:^|[^:])\/[/*]\s*HACK\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ✄ HACK',
  },
  xxx: {
    regex: /(?:^|[^:])\/[/*]\s*XXX\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ✗ XXX',
  },
  fixme: {
    regex: /(?:^|[^:])\/[/*]\s*FIXME\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ☠ FIXME',
  },
  bug: {
    regex: /(?:^|[^:])\/[/*]\s*BUG\b\s*(?:\(([^:]*)\))*\s*:?\s*(.*)/i,
    label: ' ☢ BUG',
  },
};

/**
 * Takes a line of a file and the line number, and returns an array of all of
 * the messages found in that line. Can return multiple messages per line, for
 * example, if a message was annotated with more than one type. EG: FIXME TODO
 *
 * Each message in the array will have a label, a line_number, and a
 * message. Will also include an author property if one is found on the
 * message.
 *
 * @param   {String} lineString The
 * @param   {Number} lineNumber
 *
 * @return  {Array}
 */
function retrieveMessagesFromLine(lineString, lineNumber) {
  const messageFormat = {
    author: null,
    message: null,
    label: null,
    line_number: lineNumber,
  };
  const messages = [];

  Object.keys(messageChecks).forEach(function(checkName) {
    let matchResults = lineString.match(messageChecks[checkName].regex);
    let checker = messageChecks[checkName];
    let thisMessage;

    if (matchResults && matchResults.length) {
      thisMessage = JSON.parse(JSON.stringify(messageFormat)); // Clone the above structure.

      thisMessage.label = checker.label;

      if (matchResults[1] && matchResults[1].length) {
        thisMessage.author = matchResults[1].trim();
      }

      if (matchResults[2] && matchResults[2].length) {
        thisMessage.message = matchResults[2].trim();
      }
    }

    if (thisMessage) messages.push(thisMessage);
  });

  return messages;
}

@inject('projects')
@observer
class Todo extends Component {
  static extensionName = 'todo';

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  componentWillMount() {
    this.searchDirectory();
  }

  componentDidMount() {
    ipcRenderer.on('focus', this.searchDirectory);
    this.props.projects.on('change', () => {
      this.setState({ files: [] });
      this.searchDirectory();
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('focus', this.searchDirectory);
    this.props.projects.removeListener('change', this.searchDirectory);
  }

  searchDirectory = () => {
    // TODO 监听目录文件变更
    const { currentProject } = this.props.projects;
    if (currentProject && currentProject.fullPath) {
      const srcDir = currentProject.clientSrcPath;
      const files = recursiveReaddirSync(srcDir, srcDir);
      this.setState({
        files: []
      });

      if (files.length > 0) {
        files.forEach(([filePath, fullPath]) => {
          this.matchTodo(filePath, fullPath);
        });
      } else {
        this.setState({ files: [] });
      }
    } else {
      this.setState({ files: [] });
    }
  };

  /**
   * Takes a line number and returns a padded string matching the total number of
   * characters in totalLinesNumber. EG: A lineNumber of 12 and a
   * totalLinesNumber of 1323 will return the string '  12'.
   *
   * @param   {Number} lineNumber
   * @param   {Number} totalLinesNumber
   *
   * @return  {String}
   */
  getPaddedLineNumber(lineNumber, totalLinesNumber) {
    var paddedLineNumberString = '' + lineNumber;

    while (paddedLineNumberString.length < ('' + totalLinesNumber).length) {
      paddedLineNumberString = ' ' + paddedLineNumberString;
    }

    return paddedLineNumberString;
  }

  /**
   * Takes an individual message object, as output from retrieveMessagesFromLine
   * and formats it for output.
   *
   * @param     {Object}    individualMessage
   * @property  {String}    individualMessage.author
   * @property  {String}    individualMessage.message
   * @property  {String}    individualMessage.label
   * @property  {Number}    individualMessage.line_number
   * @param     {Number}    totalNumberOfLines
   *
   * @return    {String}    The formatted message string.
   */
  formatMessageOutput(individualMessage, totalNumberOfLines) {
    const paddedLineNumber = this.getPaddedLineNumber(
      individualMessage.line_number,
      totalNumberOfLines
    );
    let finalLabelString;
    let finalNoteString;

    finalNoteString = '  [Line ' + paddedLineNumber + '] ';

    finalLabelString = individualMessage.label;

    if (individualMessage.author) {
      finalLabelString += ' from ' + individualMessage.author + ': ';
    } else {
      finalLabelString += ': ';
    }

    finalNoteString += finalLabelString;

    if (individualMessage.message && individualMessage.message.length) {
      finalNoteString += individualMessage.message;
    } else {
      finalNoteString += '[ no message ]';
    }

    return finalNoteString;
  }

  /**
   * Takes an object representing the messages and other meta-info for the file
   * and calls off to the formatters for the messages, as well as logs the
   * formatted result.
   *
   * @param     {Object}  messagesInfo
   * @property  {String}  messagesInfo.path The file path
   * @property  {Array}   messagesInfo.messages All of the message objects for the file.
   * @property  {String}  messagesInfo.totalLines Total number of lines in the file.
   */
  renderMessages(messagesInfo) {
    const { currentProject } = this.props.projects;
    const clientSrcPath = currentProject.clientSrcPath;
    return (
      <td style={{ lineHeight: '20px' }}>
        <div>{ clientSrcPath + '/' + messagesInfo.path }</div>
        <ul style={{ paddingLeft: '2em', fontSize: '0.8em', color: '#666' }}>
          {messagesInfo.messages.map((message, index) => {
            return (
              <li key={index}>
                {this.formatMessageOutput(message, messagesInfo.totalLines)}
              </li>
            );
          })}
        </ul>
      </td>
    );
  }

  matchTodo = (filePath, fullPath) => {
    const input = new LineByLine(fullPath);
    const fileMessages = { path: filePath, totalLines: 0, messages: [] };
    let currentFileLineNumber = 1;
    input.on('line', (line) => {
      if (line.length < lineLengthLimit) {
        let messages = retrieveMessagesFromLine(line, currentFileLineNumber);

        messages.forEach(function(message) {
          fileMessages.messages.push(message);
        });
      }

      currentFileLineNumber += 1;
    });

    input.on('end', () => {
      fileMessages.totalLines = currentFileLineNumber;

      if (fileMessages.messages.length) {
        this.state.files.push(fileMessages);
        this.setState(fileMessages);
      }
    });
  };

  todoCount = (files) => {
    let count = 0;
    files.forEach((file) => {
      files.forEach(() => {
        count += 1;
      });
    });
    return count;
  };

  render() {
    return (
      <DashboardCard>
        <DashboardCard.Header>
          <div>
            TODO
            <span style={{ paddingLeft: 10, fontSize: 12, color: '#666' }}>
              ({this.todoCount(this.state.files)})
            </span>
          </div>
        </DashboardCard.Header>
        <DashboardCard.Body>
          {this.state.files.length == 0 ? (
            <EmptyTips>暂无 TODO 项</EmptyTips>
          ) : (
            <table>
              <tbody>
                {this.state.files.map((file, index) => {
                  return <tr key={index}>{this.renderMessages(file)}</tr>;
                })}
              </tbody>
            </table>
          )}
        </DashboardCard.Body>
      </DashboardCard>
    );
  }
}

export default Todo;
