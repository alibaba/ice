/* eslint no-mixed-operators:0, class-methods-use-this:0 */
import React from 'react';
import {
  Alert,
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  Row,
  Col,
} from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

import PanelHeader from '../../components/PanelHeader';
import CustomButton from '../../components/CustomButton';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }
  onDismiss() {}
  notify(place) {
    const color = Math.floor(Math.random() * 5 + 1);
    let type;
    switch (color) {
      case 1:
        type = 'primary';
        break;
      case 2:
        type = 'success';
        break;
      case 3:
        type = 'danger';
        break;
      case 4:
        type = 'warning';
        break;
      case 5:
        type = 'info';
        break;
      default:
        break;
    }
    let options = {};
    options = {
      place,
      message: (
        <div>
          <div>
            Welcome to <b>Now UI Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type,
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  }
  render() {
    return (
      <div>
        <PanelHeader
          content={
            <div className="header text-center">
              <h2 className="title">Notifications</h2>
              <p className="category">
                Please Checkout{' '}
                <a
                  href="https://github.com/creativetimofficial/react-notification-alert"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Full Documentation
                </a>.
              </p>
            </div>
          }
        />
        <div className="content">
          <NotificationAlert ref="notificationAlert" />
          <Row>
            <Col md={6} xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle>Notifications Style</CardTitle>
                </CardHeader>
                <CardBody>
                  <Alert color="info">
                    <span>This is a plain notification</span>
                  </Alert>
                  <Alert
                    color="info"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    <span>This is a notification with close button.</span>
                  </Alert>
                  <Alert
                    color="info"
                    className="alert-with-icon"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    <span
                      data-notify="icon"
                      className="now-ui-icons ui-1_bell-53"
                    />
                    <span data-notify="message">
                      This is a notification with close button and icon.
                    </span>
                  </Alert>
                  <Alert
                    color="info"
                    className="alert-with-icon"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    <span
                      data-notify="icon"
                      className="now-ui-icons ui-1_bell-53"
                    />
                    <span data-notify="message">
                      This is a notification with close button and icon and have
                      many lines. You can see that the icon and the close button
                      are always vertically aligned. This is a beautiful
                      notification. So you don't have to worry about the style.
                    </span>
                  </Alert>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle>Notification states</CardTitle>
                </CardHeader>
                <CardBody>
                  <Alert
                    color="primary"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    <span>
                      <b> Primary - </b> This is a regular notification made
                      with <code>color="primary"</code>
                    </span>
                  </Alert>
                  <Alert
                    color="info"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    <span>
                      <b> Info - </b> This is a regular notification made with{' '}
                      <code>color="info"</code>
                    </span>
                  </Alert>
                  <Alert
                    color="success"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    <span>
                      <b> Success - </b> This is a regular notification made
                      with <code>color="success"</code>
                    </span>
                  </Alert>
                  <Alert
                    color="warning"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    <span>
                      <b> Warning - </b> This is a regular notification made
                      with <code>color="warning"</code>
                    </span>
                  </Alert>
                  <Alert
                    color="danger"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    <span>
                      <b> Danger - </b> This is a regular notification made with{' '}
                      <code>color="danger"</code>
                    </span>
                  </Alert>
                </CardBody>
              </Card>
            </Col>
            <Col md={12} xs={12}>
              <Card>
                <CardBody>
                  <div className="places-buttons">
                    <Row>
                      <Col md={6} className="ml-auto mr-auto text-center">
                        <CardTitle tag="h4">
                          Notifications Places
                          <p className="category">
                            Click to view notifications
                          </p>
                        </CardTitle>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={8} xs={12} className="ml-auto mr-auto">
                        <Row>
                          <Col md={4} xs={12}>
                            <CustomButton
                              color="primary"
                              block
                              onClick={() => this.notify('tl')}
                            >
                              Top Left
                            </CustomButton>
                          </Col>
                          <Col md={4} xs={12}>
                            <CustomButton
                              color="primary"
                              block
                              onClick={() => this.notify('tc')}
                            >
                              Top Center
                            </CustomButton>
                          </Col>
                          <Col md={4} xs={12}>
                            <CustomButton
                              color="primary"
                              block
                              onClick={() => this.notify('tr')}
                            >
                              Top Right
                            </CustomButton>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={8} xs={12} className="ml-auto mr-auto">
                        <Row>
                          <Col md={4} xs={12}>
                            <CustomButton
                              color="primary"
                              block
                              onClick={() => this.notify('bl')}
                            >
                              Bottom Left
                            </CustomButton>
                          </Col>
                          <Col md={4} xs={12}>
                            <CustomButton
                              color="primary"
                              block
                              onClick={() => this.notify('bc')}
                            >
                              Bottom Center
                            </CustomButton>
                          </Col>
                          <Col md={4} xs={12}>
                            <CustomButton
                              color="primary"
                              block
                              onClick={() => this.notify('br')}
                            >
                              Bottom Right
                            </CustomButton>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Notifications;
