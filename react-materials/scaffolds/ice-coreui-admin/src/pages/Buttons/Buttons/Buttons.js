import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Buttons extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Standard Buttons</strong>
          </CardHeader>
          <CardBody>
            <Row className="align-items-center">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Normal
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="primary">Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="secondary">Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success">Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="warning">Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="danger">Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="info">Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="light">Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="dark">Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="link">Link</Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Active State
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="primary" aria-pressed="true">Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="secondary" aria-pressed="true">Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="success" aria-pressed="true">Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="warning" aria-pressed="true">Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="danger" aria-pressed="true">Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="info" aria-pressed="true">Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="light" aria-pressed="true">Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="dark" aria-pressed="true">Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="link" aria-pressed="true">Link</Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Disabled
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="primary" disabled>Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="secondary" disabled>Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success" disabled>Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="warning" disabled>Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="danger" disabled>Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="info" disabled>Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="light" disabled>Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="dark" disabled>Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="link" disabled>Link</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Outline Buttons</strong>
          </CardHeader>
          <CardBody>
            <p>
              Use <code>outline</code> prop
            </p>
            <Row className="align-items-center">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Normal
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="primary">Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="secondary">Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="success">Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="warning">Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="danger">Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="info">Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="light">Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="dark">Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Active State
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline active color="primary" aria-pressed="true">Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline active color="secondary" aria-pressed="true">Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline active color="success" aria-pressed="true">Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline active color="warning" aria-pressed="true">Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline active color="danger" aria-pressed="true">Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline active color="info" aria-pressed="true">Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline active color="light" aria-pressed="true">Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline active color="dark" aria-pressed="true">Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Disabled
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="primary" disabled>Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="secondary" disabled>Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="success" disabled>Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="warning" disabled>Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="danger" disabled>Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="info" disabled>Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="light" disabled>Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block outline color="dark" disabled>Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Ghost Buttons</strong>
          </CardHeader>
          <CardBody>
            <p>
              Use
              <code>.btn-ghost-*</code> class for ghost buttons.
            </p>
            <Row className="align-items-center">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Normal
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-primary">Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-secondary">Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-success">Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-warning">Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-danger">Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-info">Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-light">Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-dark">Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Active State
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block active color="ghost-primary" aria-pressed="true">Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block active color="ghost-secondary" aria-pressed="true">Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block active color="ghost-success" aria-pressed="true">Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block active color="ghost-warning" aria-pressed="true">Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block active color="ghost-danger" aria-pressed="true">Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block active color="ghost-info" aria-pressed="true">Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block active color="ghost-light" aria-pressed="true">Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block active color="ghost-dark" aria-pressed="true">Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Disabled
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-primary" disabled>Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-secondary" disabled>Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-success" disabled>Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-warning" disabled>Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-danger" disabled>Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-info" disabled>Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-light" disabled>Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="ghost-dark" disabled>Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Square Buttons</strong>
          </CardHeader>
          <CardBody>
            <p>
              Use
              <code>.btn-square</code> class for square buttons.
            </p>
            <Row className="align-items-center">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Normal
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="primary" className="btn-square">Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="secondary" className="btn-square">Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success" className="btn-square">Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="warning" className="btn-square">Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="danger" className="btn-square">Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="info" className="btn-square">Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="light" className="btn-square">Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="dark" className="btn-square">Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="link" className="btn-square">Link</Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Active State
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="primary" className="btn-square" aria-pressed="true">Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="secondary" className="btn-square" aria-pressed="true">Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="success" className="btn-square" aria-pressed="true">Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="warning" className="btn-square" aria-pressed="true">Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="danger" className="btn-square" aria-pressed="true">Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="info" className="btn-square" aria-pressed="true">Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="light" className="btn-square" aria-pressed="true">Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="dark" className="btn-square" aria-pressed="true">Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="link" className="btn-square" aria-pressed="true">Link</Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Disabled
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="primary" className="btn-square" disabled>Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="secondary" className="btn-square" disabled>Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success" className="btn-square" disabled>Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="warning" className="btn-square" disabled>Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="danger" className="btn-square" disabled>Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="info" className="btn-square" disabled>Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="light" className="btn-square" disabled>Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="dark" className="btn-square" disabled>Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="link" className="btn-square" disabled>Link</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Pill Buttons</strong>
          </CardHeader>
          <CardBody>
            <p>
              Use
              <code>.btn-pill</code> class for pill buttons.
            </p>
            <Row className="align-items-center">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Normal
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="primary" className="btn-pill">Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="secondary" className="btn-pill">Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success" className="btn-pill">Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="warning" className="btn-pill">Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="danger" className="btn-pill">Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="info" className="btn-pill">Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="light" className="btn-pill">Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="dark" className="btn-pill">Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="link" className="btn-pill">Link</Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Active State
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="primary" className="btn-pill" aria-pressed="true">Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="secondary" className="btn-pill" aria-pressed="true">Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="success" className="btn-pill" aria-pressed="true">Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="warning" className="btn-pill" aria-pressed="true">Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="danger" className="btn-pill" aria-pressed="true">Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="info" className="btn-pill" aria-pressed="true">Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="light" className="btn-pill" aria-pressed="true">Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="dark" className="btn-pill" aria-pressed="true">Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button active block color="link" className="btn-pill" aria-pressed="true">Link</Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="12" xl className="mb-3 mb-xl-0">
                Disabled
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="primary" className="btn-pill" disabled>Primary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="secondary" className="btn-pill" disabled>Secondary</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success" className="btn-pill" disabled>Success</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="warning" className="btn-pill" disabled>Warning</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="danger" className="btn-pill" disabled>Danger</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="info" className="btn-pill" disabled>Info</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="light" className="btn-pill" disabled>Light</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="dark" className="btn-pill" disabled>Dark</Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="link" className="btn-pill" disabled>Link</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>Sizes</strong>
          </CardHeader>
          <CardBody>
            <p>Fancy larger or smaller buttons? Add <code>size="lg"</code> or <code>size="sm"</code> for additional sizes.</p>
            <Row className="align-items-center">
              <Col col="2" xl className="mb-3 mb-xl-0">
                Small
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="primary" size="sm">Standard Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="secondary" outline size="sm">Outline Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button size="sm" color="ghost-success">Ghost Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="warning" size="sm" className="btn-square">Square Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="danger" size="sm" className="btn-pill">Pill Button</Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="2" xl className="mb-3 mb-xl-0">
                Normal
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="primary">Standard Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button outline color="secondary" >Outline Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="ghost-success">Ghost Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="warning" className="btn-square">Square Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="danger" className="btn-pill">Pill Button</Button>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col col="2" xl className="mb-3 mb-xl-0">
                Large
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="primary" size="lg">Standard Button</Button>
              </Col>
              <Col col="2"className="mb-3 mb-xl-0 text-center">
                <Button outline color="secondary" size="lg">Outline Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="ghost-success" size="lg">Ghost Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="warning" size="lg" className="btn-square">Square Button</Button>
              </Col>
              <Col col="2" className="mb-3 mb-xl-0 text-center">
                <Button color="danger" size="lg" className="btn-pill">Pill Button</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <strong>With Icons</strong>
          </CardHeader>
          <CardBody>
            <Row className="align-items-center mt-3">
              <Col sm xs="12" className="text-center mt-3">
                <Button color="primary">
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Standard Button
                </Button>
              </Col>
              <Col sm xs="12" className="text-center mt-3">
                <Button color="secondary" outline>
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Outline Button
                </Button>
              </Col>
              <Col sm xs="12" className="text-center mt-3">
                <Button color="ghost-success">
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Ghost Button
                </Button>
              </Col>
              <Col sm xs="12" className="text-center mt-3">
                <Button color="warning" className="btn-square">
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Square Button
                </Button>
              </Col>
              <Col sm xs="12" className="text-center mt-3">
                <Button color="danger" className="btn-pill">
                  <i className="fa fa-lightbulb-o"></i>&nbsp;Pill Button
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Block Level Buttons</strong>
              </CardHeader>
              <CardBody>
                <p>Add prop <code>block</code></p>
                <Button color="secondary" size="lg" block>Block level button</Button>
                <Button color="primary" size="lg" block>Block level button</Button>
                <Button color="success" size="lg" block>Block level button</Button>
                <Button color="info" size="lg" block>Block level button</Button>
                <Button color="warning" size="lg" block>Block level button</Button>
                <Button color="danger" size="lg" block>Block level button</Button>
                <Button color="link" size="lg" block>Block level button</Button>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Block Level Buttons</strong>
              </CardHeader>
              <CardBody>
                <p>Add prop <code>block</code></p>
                <Button outline color="secondary" size="lg" block>Block level button</Button>
                <Button outline color="primary" size="lg" block>Block level button</Button>
                <Button outline color="success" size="lg" block>Block level button</Button>
                <Button outline color="info" size="lg" block>Block level button</Button>
                <Button outline color="warning" size="lg" block>Block level button</Button>
                <Button outline color="danger" size="lg" block>Block level button</Button>
                <Button color="ghost-info" size="lg" block>Block level button</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Buttons;
