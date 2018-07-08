import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Progress } from 'reactstrap';

class ProgressBar extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Progress</strong>
            <div className="card-header-actions">
              <a href="https://reactstrap.github.io/components/progress/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <div className="text-center">0%</div>
            <Progress />
            <div className="text-center">25%</div>
            <Progress value="25" />
            <div className="text-center">50%</div>
            <Progress value={50} />
            <div className="text-center">75%</div>
            <Progress value={75} />
            <div className="text-center">100%</div>
            <Progress value="100" />
            <div className="text-center">Multiple bars</div>
            <Progress multi>
              <Progress bar value="15" />
              <Progress bar color="success" value="30" />
              <Progress bar color="info" value="25" />
              <Progress bar color="warning" value="20" />
              <Progress bar color="danger" value="5" />
            </Progress>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Progress</strong>
            <small> color variants</small>
          </CardHeader>
          <CardBody>
            <Progress value={2 * 5} className="mb-3" />
            <Progress color="success" value="25" className="mb-3" />
            <Progress color="info" value={50} className="mb-3" />
            <Progress color="warning" value={75} className="mb-3" />
            <Progress color="danger" value="100" className="mb-3" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Progress</strong>
            <small> labels</small>
          </CardHeader>
          <CardBody>
            <Progress value="25" className="mb-3">25%</Progress>
            <Progress value={50} className="mb-3">1/2</Progress>
            <Progress value={75} className="mb-3">You're almost there!</Progress>
            <Progress color="success" value="100" className="mb-3">You did it!</Progress>
            <Progress multi className="mb-3">
              <Progress bar value="15">Meh</Progress>
              <Progress bar color="success" value="30">Wow!</Progress>
              <Progress bar color="info" value="25">Cool</Progress>
              <Progress bar color="warning" value="20">20%</Progress>
              <Progress bar color="danger" value="5">!!</Progress>
            </Progress>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Progress</strong>
            <small> striped</small>
          </CardHeader>
          <CardBody>
            <Progress striped value={2 * 5} className="mb-3" />
            <Progress striped color="success" value="25" className="mb-3" />
            <Progress striped color="info" value={50} className="mb-3" />
            <Progress striped color="warning" value={75} className="mb-3" />
            <Progress striped color="danger" value="100" className="mb-3" />
            <Progress multi className="mb-3">
              <Progress striped bar value="10" />
              <Progress striped bar color="success" value="30" />
              <Progress striped bar color="warning" value="20" />
              <Progress striped bar color="danger" value="20" />
            </Progress>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Progress</strong>
            <small> animated</small>
          </CardHeader>
          <CardBody>
            <Progress animated value={2 * 5} className="mb-3" />
            <Progress animated color="success" value="25" className="mb-3" />
            <Progress animated color="info" value={50} className="mb-3" />
            <Progress animated color="warning" value={75} className="mb-3" />
            <Progress animated color="danger" value="100" className="mb-3" />
            <Progress multi>
              <Progress animated bar value="10" />
              <Progress animated bar color="success" value="30" />
              <Progress animated bar color="warning" value="20" />
              <Progress animated bar color="danger" value="20" />
            </Progress>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Progress</strong>
            <small> multiple bars / stacked</small>
          </CardHeader>
          <CardBody>
            <div className="text-center">Plain</div>
            <Progress multi>
              <Progress bar value="15" />
              <Progress bar color="success" value="20" />
              <Progress bar color="info" value="25" />
              <Progress bar color="warning" value="20" />
              <Progress bar color="danger" value="15" />
            </Progress>
            <div className="text-center">With Labels</div>
            <Progress multi>
              <Progress bar value="15">Meh</Progress>
              <Progress bar color="success" value="35">Wow!</Progress>
              <Progress bar color="warning" value="25">25%</Progress>
              <Progress bar color="danger" value="25">LOOK OUT!!</Progress>
            </Progress>
            <div className="text-center">Stripes and Animations</div>
            <Progress multi>
              <Progress bar striped value="15">Stripes</Progress>
              <Progress bar animated color="success" value="30">Animated Stripes</Progress>
              <Progress bar color="info" value="25">Plain</Progress>
            </Progress>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Progress</strong>
            <small> max value</small>
          </CardHeader>
          <CardBody>
            <div className="text-center">1 of 5</div>
            <Progress value="1" max="5" />
            <div className="text-center">50 of 135</div>
            <Progress value={50} max="135" />
            <div className="text-center">75 of 111</div>
            <Progress value={75} max={111} />
            <div className="text-center">463 of 500</div>
            <Progress value="463" max={500} />

            <div className="text-center">Various (40) of 55</div>
            <Progress multi>
              <Progress bar value="5" max={55}>5</Progress>
              <Progress bar color="success" value="15" max={55}>15</Progress>
              <Progress bar color="warning" value="10" max={55}>10</Progress>
              <Progress bar color="danger" value="10" max={55}>10</Progress>
            </Progress>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ProgressBar;