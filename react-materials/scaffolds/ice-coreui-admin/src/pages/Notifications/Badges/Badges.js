import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';

class Badges extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Badges</strong>
                <div className="card-header-actions">
                  <a href="https://reactstrap.github.io/components/badge/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <h1>Heading <Badge color="secondary">New</Badge></h1>
                <h2>Heading <Badge color="secondary">New</Badge></h2>
                <h3>Heading <Badge color="secondary">New</Badge></h3>
                <h4>Heading <Badge color="secondary">New</Badge></h4>
                <h5>Heading <Badge color="secondary">New</Badge></h5>
                <h6>Heading <Badge color="secondary">New</Badge></h6>
              </CardBody>
              <CardFooter>
                <Button color="primary" outline>
                  Notifications <Badge color="secondary" pill style={{ position: 'static' }}>9</Badge>
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Badges</strong> <small>contextual variations</small>
              </CardHeader>
              <CardBody>
                <Badge className="mr-1" color="primary">Primary</Badge>
                <Badge className="mr-1" color="secondary">Secondary</Badge>
                <Badge className="mr-1" color="success">Success</Badge>
                <Badge className="mr-1" color="danger">Danger</Badge>
                <Badge className="mr-1" color="warning">Warning</Badge>
                <Badge className="mr-1" color="info">Info</Badge>
                <Badge className="mr-1" color="light">Light</Badge>
                <Badge className="mr-1" color="dark">Dark</Badge>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Badges</strong> <small>pill badges</small>
              </CardHeader>
              <CardBody>
                <Badge className="mr-1" color="primary" pill>Primary</Badge>
                <Badge className="mr-1" color="secondary" pill>Secondary</Badge>
                <Badge className="mr-1" color="success" pill>Success</Badge>
                <Badge className="mr-1" color="danger" pill>Danger</Badge>
                <Badge className="mr-1" color="warning" pill>Warning</Badge>
                <Badge className="mr-1" color="info" pill>Info</Badge>
                <Badge className="mr-1" color="light" pill>Light</Badge>
                <Badge className="mr-1" color="dark" pill>Dark</Badge>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Badges</strong> <small>links</small>
              </CardHeader>
              <CardBody>
                <Badge className="mr-1" href="#" color="primary">Primary</Badge>
                <Badge className="mr-1" href="#" color="secondary">Secondary</Badge>
                <Badge className="mr-1" href="#" color="success">Success</Badge>
                <Badge className="mr-1" href="#" color="danger">Danger</Badge>
                <Badge className="mr-1" href="#" color="warning">Warning</Badge>
                <Badge className="mr-1" href="#" color="info">Info</Badge>
                <Badge className="mr-1" href="#" color="light">Light</Badge>
                <Badge className="mr-1" href="#" color="dark" pill>Dark</Badge>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Badges;
