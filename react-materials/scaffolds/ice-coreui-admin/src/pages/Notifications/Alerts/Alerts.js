import React, { Component } from 'react';
import { Alert, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Alerts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Alerts</strong>
                <div className="card-header-actions">
                  <a href="https://reactstrap.github.io/components/alerts/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <Alert color="primary">
                  This is a primary alert — check it out!
                </Alert>
                <Alert color="secondary">
                  This is a secondary alert — check it out!
                </Alert>
                <Alert color="success">
                  This is a success alert — check it out!
                </Alert>
                <Alert color="danger">
                  This is a danger alert — check it out!
                </Alert>
                <Alert color="warning">
                  This is a warning alert — check it out!
                </Alert>
                <Alert color="info">
                  This is a info alert — check it out!
                </Alert>
                <Alert color="light">
                  This is a light alert — check it out!
                </Alert>
                <Alert color="dark">
                  This is a dark alert — check it out!
                </Alert>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Alerts</strong>
                <small> use <code>.alert-link</code> to provide links</small>
              </CardHeader>
              <CardBody>
                <Alert color="primary">
                  This is a primary alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
                </Alert>
                <Alert color="secondary">
                  This is a secondary alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
                </Alert>
                <Alert color="success">
                  This is a success alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
                </Alert>
                <Alert color="danger">
                  This is a danger alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
                </Alert>
                <Alert color="warning">
                  This is a warning alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
                </Alert>
                <Alert color="info">
                  This is a info alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
                </Alert>
                <Alert color="light">
                  This is a light alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
                </Alert>
                <Alert color="dark">
                  This is a dark alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
                </Alert>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Alerts</strong>
                <small>additional content</small>
              </CardHeader>
              <CardBody>
                <Alert color="success">
                  <h4 className="alert-heading">Well done!</h4>
                  <p>
                    Aww yeah, you successfully read this important alert message. This example text is going
                    to run a bit longer so that you can see how spacing within an alert works with this kind
                    of content.
                  </p>
                  <hr />
                  <p className="mb-0">
                    Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                  </p>
                </Alert>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Alerts</strong>
                <small>dismissing</small>
              </CardHeader>
              <CardBody>
                <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                  I am an alert and I can be dismissed!
                </Alert>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Alerts;
