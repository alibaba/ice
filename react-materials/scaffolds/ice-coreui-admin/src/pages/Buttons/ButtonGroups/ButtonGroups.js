import React, { Component } from 'react';
import {
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';

class ButtonGroups extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(2).fill(false),
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Button Group</strong>
                <div className="card-header-actions">
                  <a href="https://reactstrap.github.io/components/button-group/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <ButtonGroup>
                  <Button>Left</Button>
                  <Button>Middle</Button>
                  <Button>Right</Button>
                </ButtonGroup>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Vertical variation</strong>
              </CardHeader>
              <CardBody>
                <ButtonGroup vertical>
                  <Button>1</Button>
                  <Button>2</Button>
                  <ButtonDropdown isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1); }}>
                    <DropdownToggle caret>
                      Dropdown
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Dropdown Link</DropdownItem>
                      <DropdownItem>Dropdown Link</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Button Toolbar</strong>
              </CardHeader>
              <CardBody>
                <ButtonToolbar>
                  <ButtonGroup className="mr-2">
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <Button>4</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2">
                    <Button>5</Button>
                    <Button>6</Button>
                    <Button>7</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button>8</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Sizing</strong>
              </CardHeader>
              <CardBody>
                <ButtonGroup size="lg">
                  <Button>Left</Button>
                  <Button>Middle</Button>
                  <Button>Right</Button>
                </ButtonGroup>
                <hr />
                <ButtonGroup>
                  <Button>Left</Button>
                  <Button>Middle</Button>
                  <Button>Right</Button>
                </ButtonGroup>
                <hr />
                <ButtonGroup size="sm">
                  <Button>Left</Button>
                  <Button>Middle</Button>
                  <Button>Right</Button>
                </ButtonGroup>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Nesting</strong>
              </CardHeader>
              <CardBody>
                <ButtonGroup>
                  <Button>1</Button>
                  <Button>2</Button>
                  <ButtonDropdown isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                    <DropdownToggle caret>
                      Dropdown
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Dropdown Link</DropdownItem>
                      <DropdownItem>Dropdown Link</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Button Toolbar</strong> <small>with input groups</small>
              </CardHeader>
              <CardBody>
                <ButtonToolbar className="mb-3">
                  <ButtonGroup className="mr-2">
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <Button>4</Button>
                  </ButtonGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend"><InputGroupText>@</InputGroupText></InputGroupAddon>
                    <Input placeholder="Input group example" />
                  </InputGroup>
                </ButtonToolbar>
                <ButtonToolbar className="justify-content-between">
                  <ButtonGroup>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <Button>4</Button>
                  </ButtonGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend"><InputGroupText>@</InputGroupText></InputGroupAddon>
                    <Input placeholder="Input group example" />
                  </InputGroup>
                </ButtonToolbar>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ButtonGroups;
