import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './BasicDetailInfo.scss';

/**
 * 渲染详情信息的数据
 */
const dataSoruce = {
  title: '集盒家居旗舰店双十一活动',
  shopName: '集盒家居旗舰店',
  amount: '1000.00',
  bounty: '200.00',
  orderTime: '2017-10-18 12:20:07',
  deliveryTime: '2017-10-18 12:20:07',
  phone: '15612111213',
  address: '杭州市文一西路',
  status: '进行中',
  remark: '暂无',
  pics: [
    'https://img.alicdn.com/imgextra/i3/672246894/TB2ziLDdbsTMeJjSszdXXcEupXa_!!672246894-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp',
    'https://img.alicdn.com/imgextra/i1/2645911918/TB2qQA9fk.HL1JjSZFuXXX8dXXa_!!2645911918-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp',
    'https://img.alicdn.com/bao/uploaded/TB2obaBXeLyQeBjy1XaXXcexFXa_!!0-dgshop.jpg_180x180xzq90.jpg_.webp',
    'https://img.alicdn.com/tps/i1/99136475/TB2Cc7saE1HTKJjSZFmXXXeYFXa_!!0-juitemmedia.jpg_180x180q90.jpg_.webp',
  ],
};

export default class BasicDetailInfo extends Component {
  static displayName = 'BasicDetailInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="basic-detail-info">
        <IceContainer>
          <h2 style={styles.basicDetailTitle}>基础详情页</h2>
          <div className="info-item" style={styles.infoItem}>
            <h5 style={styles.infoItemTitle}>基本信息</h5>
            <ul>
              <li>
                <span>任务标题：</span>
                <span>{dataSoruce.title}</span>
              </li>
              <li>
                <span>店铺名称：</span>
                <span>{dataSoruce.shopName}</span>
              </li>
              <li>
                <span>任务金额：</span>
                <span>¥ {dataSoruce.amount}</span>
              </li>
              <li>
                <span>任务赏金：</span>
                <span>¥ {dataSoruce.bounty}</span>
              </li>
              <li>
                <span>接单时间：</span>
                <span>{dataSoruce.orderTime}</span>
              </li>
              <li>
                <span>交付时间：</span>
                <span>{dataSoruce.deliveryTime}</span>
              </li>
            </ul>
          </div>
          <div className="info-item" style={styles.infoItem}>
            <h5 style={styles.infoItemTitle}>更多信息</h5>
            <ul>
              <li>
                <span>联系方式：</span>
                <span>{dataSoruce.phone}</span>
              </li>
              <li>
                <span>收货地址：</span>
                <span>{dataSoruce.address}</span>
              </li>
              <li>
                <span>任务状态：</span>
                <span>{dataSoruce.status}</span>
              </li>
              <li>
                <span>备注：</span>
                <span>{dataSoruce.remark}</span>
              </li>
              <li>
                <span style={styles.attachLabel}>附件：</span>
                <span>
                  {dataSoruce.pics &&
                    dataSoruce.pics.length &&
                    dataSoruce.pics.map((pic, index) => {
                      return (
                        <img
                          key={index}
                          src={pic}
                          style={styles.attachPics}
                          alt=""
                        />
                      );
                    })}
                </span>
              </li>
            </ul>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  basicDetailTitle: {
    fontSize: '16px',
  },
  infoItem: {
    marginLeft: '16px',
  },
  infoItemTitle: {
    borderLeft: '3px solid #3080fe',
    paddingLeft: '10px',
  },
  attachLabel: {
    float: 'left',
  },
  attachPics: {
    width: '80px',
    height: '80px',
    border: '1px solid #eee',
    marginRight: '10px',
  },
};
