import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Tooltip, UncontrolledTooltip } from 'reactstrap';

class TooltipItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  render() {
    return (
      <span>
        <Button className="mr-1" color="secondary" id={'Tooltip-' + this.props.id}>
          {this.props.item.text}
        </Button>
        <Tooltip placement={this.props.item.placement} isOpen={this.state.tooltipOpen} target={'Tooltip-' + this.props.id} toggle={this.toggle}>
          Tooltip Content!
        </Tooltip>
      </span>
    );
  }
}

class Tooltips extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: [false, false],
      tooltips: [
        {
          placement: 'top',
          text: 'Top',
        },
        {
          placement: 'bottom',
          text: 'Bottom',
        },
        {
          placement: 'left',
          text: 'Left',
        },
        {
          placement: 'right',
          text: 'Right',
        },
      ],
    };
  }

  toggle(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      tooltipOpen: newArray,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Tooltips</strong>
            <div className="card-header-actions">
              <a href="https://reactstrap.github.io/components/tooltips/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <p>Somewhere in here is a <a href="#" id="TooltipExample">tooltip</a>.</p>
            <Tooltip placement="right" isOpen={this.state.tooltipOpen[0]} target="TooltipExample" toggle={() => {this.toggle(0);}}>
              Hello world!
            </Tooltip>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Tooltip</strong>
            <small> disable autohide</small>
          </CardHeader>
          <CardBody>
            <p>Sometimes you need to allow users to select text within a <a href="#" id="DisabledAutoHideExample">tooltip</a>.</p>
            <Tooltip placement="top" isOpen={this.state.tooltipOpen[1]} autohide={false} target="DisabledAutoHideExample" toggle={() => {this.toggle(1);}}>
              Try to select this text!
            </Tooltip>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Tooltip</strong>
            <small> list</small>
          </CardHeader>
          <CardBody>
            {this.state.tooltips.map((tooltip, i) => {
              return <TooltipItem key={i} item={tooltip} id={i} />;
            })}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Tooltip</strong>
            <small> uncontrolled</small>
          </CardHeader>
          <CardBody>
            <p>Somewhere in here is a <a href="#" id="UncontrolledTooltipExample">tooltip</a>.</p>
            <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
              Hello world!
            </UncontrolledTooltip>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Tooltips;