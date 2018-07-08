import React, { Component } from 'react';
import { CardGroup, Col, Row } from 'reactstrap';
import Widget01 from './Widget01';
import Widget02 from './Widget02';
import Widget03 from './Widget03';
import Widget04 from './Widget04';
import { Line } from 'react-chartjs-2';


// Brand Card Chart
const makeSocialBoxData = (dataSetNo) => {
  const socialBoxData = [
    { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
    { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
    { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
    { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
  ];

  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Widgets extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Widget01 color="success" header="89.9%" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget01 color="info" header="12.124" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget01 color="warning" header="$98.111,00" smallText="">
              <small className="text-muted">Excepteur sint occaecat...</small>
            </Widget01>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget01 color="danger" value="95" header="1.9 TB" mainText="Danger!"
                      smallText="This is your final warning..." />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget01 color="primary" variant="inverse" header="89.9%" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget01 color="warning" variant="inverse" header="12.124" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget01 color="danger" variant="inverse" header="$98.111,00" smallText="">
              <small className="text-muted">Excepteur sint occaecat...</small>
            </Widget01>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget01 color="info" variant="inverse" value="95" header="1.9 TB" mainText="Danger!"
                      smallText="This is your final warning..." />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-cogs" color="primary" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-laptop" color="info" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-moon-o" color="warning" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-bell" color="danger" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-cogs" color="primary" footer link="#/charts" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-laptop" color="info" footer />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-moon-o" color="warning" footer />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-bell" color="danger" footer />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-cogs" color="primary" variant="1" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-laptop" color="info" variant="1" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-moon-o" color="warning" variant="1" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-bell" color="danger" variant="1" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-cogs" color="primary" variant="2" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-laptop" color="info" variant="2" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-moon-o" color="warning" variant="2" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-bell" color="danger" variant="2" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={3}>
            <Widget03 dataBox={() => ({ variant: 'facebook', friends: '89k', feeds: '459' })} >
              <div className="chart-wrapper">
                <Line data={makeSocialBoxData(0)} options={socialChartOpts} height={90} />
              </div>
            </Widget03>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Widget03 dataBox={() => ({ variant: 'twitter', followers: '973k', tweets: '1.792' })} >
              <div className="chart-wrapper">
                <Line data={makeSocialBoxData(1)} options={socialChartOpts} height={90} />
              </div>
            </Widget03>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Widget03 dataBox={() => ({ variant: 'linkedin', contacts: '500+', feeds: '292' })} >
              <div className="chart-wrapper">
                <Line data={makeSocialBoxData(2)} options={socialChartOpts} height={90} />
              </div>
            </Widget03>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Widget03 dataBox={() => ({ variant: 'google-plus', followers: '894', circles: '92' })} >
              <div className="chart-wrapper">
                <Line data={makeSocialBoxData(3)} options={socialChartOpts} height={90} />
              </div>
            </Widget03>
          </Col>
        </Row>
        <CardGroup className="mb-4">
          <Widget04 icon="icon-people" color="info" header="87.500" value="25">Visitors</Widget04>
          <Widget04 icon="icon-user-follow" color="success" header="385" value="25">New Clients</Widget04>
          <Widget04 icon="icon-basket-loaded" color="warning" header="1238" value="25">Products sold</Widget04>
          <Widget04 icon="icon-pie-chart" color="primary" header="28%" value="25">Returning Visitors</Widget04>
          <Widget04 icon="icon-speedometer" color="danger" header="5:34:11" value="25">Avg. Time</Widget04>
        </CardGroup>
        <Row>
          <Col sm="6" md="2">
            <Widget04 icon="icon-people" color="info" header="87.500" value="25">Visitors</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04 icon="icon-user-follow" color="success" header="385" value="25">New Clients</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04 icon="icon-basket-loaded" color="warning" header="1238" value="25">Products sold</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04 icon="icon-pie-chart" color="primary" header="28%" value="25">Returning Visitors</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04 icon="icon-speedometer" color="danger" header="5:34:11" value="25">Avg. Time</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04 icon="icon-speech" color="info" header="972" value="25">Comments</Widget04>
          </Col>
        </Row>
        <Row>
          <Col sm="6" md="2">
            <Widget04 icon="icon-people" color="info" header="87.500" value="25" invert>Visitors</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04 icon="icon-user-follow" color="success" header="385" value="25" invert>New Clients</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04 icon="icon-basket-loaded" color="warning" header="1238" value="25" invert>Products sold</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04 icon="icon-pie-chart" color="primary" header="28%" value="25" invert>Returning Visitors</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04 icon="icon-speedometer" color="danger" header="5:34:11" value="25" invert>Avg. Time</Widget04>
          </Col>
          <Col sm="6" md="2">
            <Widget04 icon="icon-speech" color="info" header="972" value="25" invert>Comments</Widget04>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Widgets;
