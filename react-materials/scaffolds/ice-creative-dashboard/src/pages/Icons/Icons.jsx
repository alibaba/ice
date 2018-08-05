import React from 'react';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import PanelHeader from '../../components/PanelHeader';

import icons from '../../variables/icons';

class Icons extends React.Component {
  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">100 Awesome Nucleo Icons</h5>
                  <p className="category">
                    Handcrafted by our friends from <a href="#">NucleoApp</a>
                  </p>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                    {icons.map((prop, key) => {
                      return (
                        <Col
                          lg={2}
                          md={3}
                          sm={4}
                          xs={6}
                          className="font-icon-list"
                          key={key}
                        >
                          <div className="font-icon-detail">
                            <i className={'now-ui-icons ' + prop} />
                            <p>{prop}</p>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Icons;
