import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SourceBox from './SourceBox';
import TargetBox from './TargetBox';

function generateSource(component, dropback, index) {
  return (
    <SourceBox dropBack={dropback} index={index} key={index}>
      {component}
    </SourceBox>
  );
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSource: [
        'Sucking at something is the first step towards being sorta good at',
        'People make mistakes. It’s a part of growing up Homies help homies. Always',
        'Sometimes life is scary and dark',
        'Dont you always call sweatpants give up on life pants, Jake?',
      ],
      listTarget: [
        "That's it! The answer was so simple, I was too smart to see it!",
      ],
    };
  }

  renderSource = () => {
    return this.state.listSource.map((item, index) =>
      generateSource(item, this.sourceToTarget, index)
    );
  };

  renderTarget = () => {
    return this.state.listTarget.map((item, index, self) => {
      if (self.length) {
        return generateSource(item, null, index);
      }
      return generateSource(item, this.sourceToTarget, index);
    });
  };

  sourceToTarget = (index) => {
    this.setState((prevState) => {
      return {
        listTarget: [...prevState.listTarget, prevState.listSource[index]],
        listSource: [].concat(
          prevState.listSource.splice(0, index),
          prevState.listSource.splice(index)
        ),
      };
    });
  };

  render() {
    return (
      <div style={styles.listContainer}>
        <div style={styles.list}>
          <div style={styles.listTitle}>List Source</div>
          <div style={{ minHeight: '15rem', padding: '15px', background: '#fff' }}>
            {this.renderSource()}
          </div>
        </div>
        <div style={styles.list}>
          <div style={styles.listTitle}>List Target</div>
          <TargetBox>{this.renderTarget()}</TargetBox>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);

const styles = {
  listContainer: {
    display: 'flex',
  },
  list: {
    margin: '0 7.5px',
    padding: '15px',
    background: '#f7f7f7',
    borderRadius: '4px',
    flex: 1,
  },
  listTitle: {
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};
