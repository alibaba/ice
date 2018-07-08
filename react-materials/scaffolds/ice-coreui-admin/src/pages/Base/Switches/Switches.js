import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class Switches extends Component {
  render() {
    return (
      <div className="animated fadeIn">

        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch default
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} color={'primary'} checked />
                <AppSwitch className={'mx-1'} color={'secondary'} checked />
                <AppSwitch className={'mx-1'} color={'success'} checked />
                <AppSwitch className={'mx-1'} color={'warning'} checked />
                <AppSwitch className={'mx-1'} color={'info'} checked />
                <AppSwitch className={'mx-1'} color={'danger'} checked />
                <AppSwitch className={'mx-1'} color={'light'} checked />
                <AppSwitch className={'mx-1'} color={'dark'} checked />
                <AppSwitch className={'mx-1'} color={'primary'} disabled />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch pills
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'secondary'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'warning'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'info'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'light'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'dark'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} disabled />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                3d Switch
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'secondary'} defaultChecked />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'success'} defaultChecked />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'warning'} defaultChecked />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'info'} defaultChecked />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'danger'} defaultChecked />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'light'} defaultChecked />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'dark'} defaultChecked />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'}  />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                3d Switch <small><code>disabled</code></small>
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} checked disabled />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'secondary'} checked disabled />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'success'} checked disabled />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'warning'} checked disabled />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'info'} checked disabled />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'danger'} checked disabled />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'light'} checked disabled />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'dark'} checked disabled />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} disabled />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                3d Switch <small><code>outline="alt"</code></small>
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} checked outline={'alt'} />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'secondary'} checked outline={'alt'} />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'success'} checked outline={'alt'} />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'warning'} checked outline={'alt'} />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'info'} checked outline={'alt'} />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'danger'} checked outline={'alt'} />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'light'} checked outline={'alt'} />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'dark'} checked outline={'alt'} />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} outline={'alt'} disabled />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                3d Switch <small><code>label</code></small>
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'3d'} color={'secondary'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'success'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'warning'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'info'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'danger'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'light'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'dark'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} label dataOn={'\u2713'} dataOff={'\u2715'}/>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                3d Switch <small><code>outline="alt" label</code></small>
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'primary'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'secondary'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'success'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'warning'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'info'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'danger'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'light'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'dark'} defaultChecked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'primary'} label dataOn={'\u2713'} dataOff={'\u2715'}/>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                3d Switch <small><code>outline="alt" label</code></small>
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'primary'} defaultChecked label />
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'secondary'} defaultChecked label />
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'success'} defaultChecked label />
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'warning'} defaultChecked label />
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'info'} defaultChecked label />
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'danger'} defaultChecked label />
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'light'} defaultChecked label />
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'dark'} defaultChecked label />
                <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'primary'} label />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch outline
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} color={'primary'} outline checked />
                <AppSwitch className={'mx-1'} color={'secondary'} outline checked />
                <AppSwitch className={'mx-1'} color={'success'} outline checked />
                <AppSwitch className={'mx-1'} color={'warning'} outline checked />
                <AppSwitch className={'mx-1'} color={'info'} outline checked />
                <AppSwitch className={'mx-1'} color={'danger'} outline checked />
                <AppSwitch className={'mx-1'} color={'light'} outline checked />
                <AppSwitch className={'mx-1'} color={'dark'} outline checked />
                <AppSwitch className={'mx-1'} color={'primary'} outline disabled />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch outline pills
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'secondary'} outline checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} outline checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'warning'} outline checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'info'} outline checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} outline checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'light'} outline checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'dark'} outline checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline disabled />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch outline alternative
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} color={'primary'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} color={'secondary'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} color={'success'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} color={'warning'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} color={'info'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} color={'danger'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} color={'light'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} color={'dark'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} color={'primary'} outline={'alt'} disabled />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch outline alternative - pills
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'secondary'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'warning'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'info'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'light'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'dark'} outline={'alt'} checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} disabled />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} color={'primary'} label checked />
                <AppSwitch className={'mx-1'} color={'secondary'} label checked />
                <AppSwitch className={'mx-1'} color={'success'} label checked />
                <AppSwitch className={'mx-1'} color={'warning'} label checked />
                <AppSwitch className={'mx-1'} color={'info'} label checked />
                <AppSwitch className={'mx-1'} color={'danger'} label checked />
                <AppSwitch className={'mx-1'} color={'light'} label checked />
                <AppSwitch className={'mx-1'} color={'dark'} label checked />
                <AppSwitch className={'mx-1'} color={'primary'} label disabled />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text pills
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'secondary'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'warning'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'info'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'light'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'dark'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} label disabled />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} color={'primary'} outline label checked />
                <AppSwitch className={'mx-1'} color={'secondary'} outline label checked />
                <AppSwitch className={'mx-1'} color={'success'} outline label checked />
                <AppSwitch className={'mx-1'} color={'warning'} outline label checked />
                <AppSwitch className={'mx-1'} color={'info'} outline label checked />
                <AppSwitch className={'mx-1'} color={'danger'} outline label checked />
                <AppSwitch className={'mx-1'} color={'light'} outline label checked />
                <AppSwitch className={'mx-1'} color={'dark'} outline label checked />
                <AppSwitch className={'mx-1'} color={'primary'} outline label disabled />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline pills
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'secondary'} outline label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} outline label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'warning'} outline label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'info'} outline label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} outline label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'light'} outline label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'dark'} outline label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline label disabled />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline alternative pills
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} color={'primary'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} color={'secondary'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} color={'success'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} color={'warning'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} color={'info'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} color={'danger'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} color={'light'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} color={'dark'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} color={'primary'} outline={'alt'} label disabled />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline alternative pills
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'secondary'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'warning'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'info'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'light'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'dark'} outline={'alt'} label checked />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} label disabled />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline alternative
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} color={'primary'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'secondary'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'success'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'warning'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'info'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} color={'danger'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'light'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'dark'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'primary'} outline disabled label dataOn={'\u2713'} dataOff={'\u2715'}/>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline alternative pills
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'secondary'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'warning'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'info'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'light'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'dark'} outline checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline disabled label dataOn={'\u2713'} dataOff={'\u2715'}/>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline alternative
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} color={'primary'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'secondary'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'success'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'warning'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'info'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} color={'danger'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'light'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'dark'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'}/>
                <AppSwitch className={'mx-1'} color={'primary'} outline={'alt'} disabled label dataOn={'\u2713'} dataOff={'\u2715'}/>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                Switch with text outline alternative pills
              </CardHeader>
              <CardBody>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'secondary'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'warning'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'info'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'light'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'dark'} outline={'alt'} checked label dataOn={'\u2713'} dataOff={'\u2715'} />
                <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} outline={'alt'} disabled label dataOn={'\u2713'} dataOff={'\u2715'}/>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12">
            <Card>
              <CardHeader>
                Sizes
              </CardHeader>
              <CardBody className="p-0">
                <Table hover striped className="table-align-middle mb-0">
                  <thead>
                  <tr>
                    <th>Size</th>
                    <th>Example</th>
                    <th>Props</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>
                      Large
                    </td>
                    <td>
                      <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} checked size={'lg'} />
                    </td>
                    <td>
                      Add <code>size={'lg'}</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Normal
                    </td>
                    <td>
                      <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} checked  />
                    </td>
                    <td>
                      -
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Small
                    </td>
                    <td>
                      <AppSwitch className={'mx-1'} variant={'3d'} color={'primary'} checked size={'sm'} />
                    </td>
                    <td>
                      Add <code>size={'sm'}</code>
                    </td>
                  </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>

    );
  }
}

export default Switches;
