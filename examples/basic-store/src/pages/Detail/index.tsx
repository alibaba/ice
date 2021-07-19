import React from 'react';
import store from './store';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  public render() {
    const { default: detailStore } = this.props as any;
    const [state, dispatcher] = detailStore;
    return (
      <>
        <div>Detail Page</div>
        <div>Title: {state.title}</div>
        <button onClick={() => dispatcher.updateDetailTitle('test')} type="button">Change Title</button>
      </>
    );
  }
}

export default store.withModel('default')(Detail);
