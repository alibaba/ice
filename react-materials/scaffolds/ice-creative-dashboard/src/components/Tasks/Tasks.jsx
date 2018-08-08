import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';

import CustomButton from '../CustomButton';
import CustomCheckbox from '../CustomCheckbox';

class Task extends React.Component {
  render() {
    const tasksList = [];
    let number;
    let edit;
    let remove;
    for (let i = 0; i < this.props.tasks.length; i++) {
      number = 'checkbox' + i;
      edit = 'edit' + i;
      remove = 'remove' + i;
      tasksList.push(
        <tr key={i}>
          <td>
            <CustomCheckbox
              inputProps={{
                value: number,
                defaultChecked: this.props.tasks[i].checked,
              }}
            />
          </td>
          <td className="text-left">{this.props.tasks[i].text}</td>
          <td className="td-actions text-right">
            <CustomButton id={edit} round icon iconMini neutral color="info">
              <i className="now-ui-icons ui-2_settings-90" />
            </CustomButton>
            <UncontrolledTooltip placement="top" target={edit} delay={0}>
              Edit Task
            </UncontrolledTooltip>
            <CustomButton
              id={remove}
              round
              icon
              iconMini
              neutral
              color="danger"
            >
              <i className="now-ui-icons ui-1_simple-remove" />
            </CustomButton>
            <UncontrolledTooltip placement="top" target={remove} delay={0}>
              Remove
            </UncontrolledTooltip>
          </td>
        </tr>
      );
    }
    return (
      <div className="table-full-width table-responsive">
        <table className="table">
          <tbody>{tasksList}</tbody>
        </table>
      </div>
    );
  }
}

Task.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
};

export default Task;
