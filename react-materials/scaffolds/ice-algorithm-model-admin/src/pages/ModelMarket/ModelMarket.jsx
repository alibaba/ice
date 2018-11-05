import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../components/ContainerTitle';
import ModalCard from './components/ModelCard';

export default class ModelMarket extends Component {
  static displayName = 'ModelMarket';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer style={{ padding: 0 }}>
        <ContainerTitle title="模型市场" />
        <ModalCard />
      </IceContainer>
    );
  }
}
