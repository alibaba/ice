import React, { Component } from 'react';
import Board from 'react-trello';

export default class App extends Component {
  handleDragStart = (cardId, laneId) => {
    console.log('handleDragStart:', cardId, laneId);
  };

  handleDragEnd = (cardId, sourceLaneId, targetLaneId, position) => {
    console.log('handleDragEnd:', cardId, sourceLaneId, targetLaneId, position);
  };

  shouldReceiveNewData = (nextData) => {
    console.log(nextData);
  };

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`);
  };

  render() {
    const data = {
      lanes: [
        {
          id: '1',
          label: '3/3',
          title: '待处理',
          cards: [
            {
              id: 'Card1',
              title: '拖动排序',
              description: '任务列表也可以拖动排序，拖动一个任务列表试试看',
              label: '30 mins',
            },
            {
              id: 'Card2',
              title: '新建任务',
              description: '点击【Add Card】，试试创建一条新的任务',
              label: '5 mins',
              metadata: { sha: 'be312a1' },
            },
            {
              id: 'Card3',
              title: '任务时间',
              description: '设置了截止时间的任务，会在任务日历中显示',
              label: '5 mins',
              metadata: { sha: 'be312a1' },
            },
          ],
        },
        {
          id: '2',
          title: '进行中',
          label: '0/0',
          cards: [],
        },
        {
          id: '3',
          title: '已完成',
          label: '0/0',
          cards: [],
        },
        {
          id: '4',
          title: '以后再做',
          label: '0/0',
          cards: [],
        },
        {
          id: '5',
          title: '已归档',
          label: '0/0',
          cards: [],
        },
      ],
    };
    return (
      <Board
        style={{ background: '#fff', padding: '12px', borderRadius: '6px' }}
        data={data}
        draggable
        collapsibleLanes
        handleDragStart={this.handleDragStart}
        handleDragEnd={this.handleDragEnd}
        onDataChange={this.shouldReceiveNewData}
        onCardAdd={this.handleCardAdd}
      />
    );
  }
}
