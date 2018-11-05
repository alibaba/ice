import React from 'react';
import { Chart, Geom, Tooltip, Coord, Label, Shape } from 'bizcharts';

class GenderPieChart extends React.Component {
  render() {
    const data = [
      {
        sex: '男',
        sold: 0.45,
      },
      {
        sex: '女',
        sold: 0.55,
      },
    ];
    Shape.registerShape('interval', 'radiusPie', {
      draw(cfg, container) {
        // 将归一化后的数据转换为画布上的坐标
        const points = cfg.origin.points;
        let path = [];

        for (let i = 0; i < cfg.origin.points.length; i += 4) {
          path.push(['M', points[i].x, points[i].y]);
          path.push(['L', points[i + 1].x, points[i + 1].y]);
          path.push(['L', points[i + 2].x, points[i + 2].y]);
          path.push(['L', points[i + 3].x, points[i + 3].y]);
          path.push(['L', points[i].x, points[i].y]);
          path.push(['z']);
        }

        path = this.parsePath(path, true);
        const rect = container.addShape('path', {
          attrs: {
            fill: cfg.color || '#00D9DF',
            path,
          },
        });
        const minH = Math.min(path[1][7], path[2][2]);
        const minW = Math.min(path[1][6], path[2][1]);
        const diffH = Math.abs(path[1][7] - path[2][2]);
        const diffW = Math.abs(path[1][6] - path[2][1]);
        container.addShape('circle', {
          attrs: {
            x: minW + diffW / 2,
            y: minH + diffH / 2,
            fill: cfg.color,
            radius: diffH / 2,
          },
        });
        const minHH = Math.min(path[3][7], path[4][2]);
        const minWW = Math.min(path[3][6], path[4][1]);
        const diffHH = Math.abs(path[3][7] - path[4][2]);
        const diffWW = Math.abs(path[3][6] - path[4][1]);
        container.addShape('circle', {
          attrs: {
            x: minWW + diffWW / 2,
            y: minHH + diffHH / 2,
            fill: cfg.color,
            radius: diffH / 2,
          },
        });
        return rect;
      },
    });
    const COLORS = ['#1890ff', '#f04864'];
    return (
      <div>
        <Chart height={260} data={data} padding={[10]} forceFit>
          <Coord type="theta" radius={0.5} />
          <Tooltip showTitle={false} />
          <Geom
            type="intervalStack"
            position="sold"
            color={['sex', COLORS]}
            shape="radiusPie"
          >
            <Label
              content="sold"
              custom
              htmlTemplate={(text, item) => {
                const isFemale = item.point.sex === '女';
                const src = isFemale
                  ? 'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png'
                  : 'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png';
                const color = isFemale ? COLORS[1] : COLORS[0];
                const IMG = `<img style="width:20px" src="${src}" /><br/>`;
                return `<div style="text-align:center;color:${color}">${IMG}${(
                  text * 100
                ).toFixed(0)}%</div>`;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default GenderPieChart;
