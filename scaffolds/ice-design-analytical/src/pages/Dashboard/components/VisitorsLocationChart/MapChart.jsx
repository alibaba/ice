/* eslint no-plusplus:0 */
import React, { Component } from 'react';
import { Chart, Geom, Tooltip, Label, View } from 'bizcharts';
import axios from 'axios';
import { DataSet } from '@antv/data-set';

export default class MapChart extends Component {
  static displayName = 'MapChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.getChinaGeo();
  }

  getChinaGeo = () => {
    axios
      .get(
        '//raw.githubusercontent.com/alibaba/BizCharts/gh-pages/public/data/china-geo.json'
      )
      .then((res) => {
        console.log('res:', res);
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { data } = this.state;
    if (!data.features) {
      return <p>数据加载中...</p>;
    }
    const cols = {
      x: { sync: true, nice: false },
      y: { sync: true, nice: false },
    };
    console.log(this.state.data);
    const { features = [] } = this.state.data;
    const userData = [];
    for (let i = 0; i < features.length; i++) {
      const name = features[i].properties.name;
      userData.push({
        name,
        value: Math.round(Math.random() * 1000),
      });
    }
    // data set
    const ds = new DataSet();
    // geo data
    const dvGeo = ds.createView().source(data, {
      type: 'GeoJSON',
    });
    // user data
    const dvData = ds.createView().source(userData);
    // assign centroid point (x, y) to user data
    dvData.transform({
      type: 'geo.region',
      field: 'name',
      geoDataView: dvGeo,
      as: ['longitude', 'latitude'],
    });

    return (
      <Chart height={380} scale={cols} padding={[2]} forceFit>
        <Tooltip showTitle={false} />
        <View data={dvGeo}>
          <Geom
            type="polygon"
            position="longitude*latitude"
            style={{ fill: '#fff', stroke: '#ccc', lineWidth: 1 }}
          />
        </View>
        <View
          data={dvData}
          scale={{
            trend: {
              alias: 'name',
            },
          }}
        >
          <Geom
            type="polygon"
            position="longitude*latitude"
            animate={{ leave: { animation: 'fadeOut' } }}
            opacity="value"
            tooltip="name*trend"
            color={['trend', ['#307ffe', '#e3edff']]}
            size={0}
          >
            <Label
              content="name"
              offset={0}
              textStyle={{ fill: '#545454', fontSize: 10 }}
            />
          </Geom>
        </View>
        <Geom
          type="polygon"
          position="x*y"
          style={{ lineWidth: 1, stroke: '#fff' }}
          color={['count', ['rgb(200, 200, 255)', 'rgb(0, 0, 255)']]}
        />
      </Chart>
    );
  }
}
