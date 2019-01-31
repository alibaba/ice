import React, { Component } from 'react';
import { Timeline } from '@alifd/next';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../../../components/ContainerTitle';
import './index.scss';

const { Item: TimelineItem } = Timeline;

export default class ActiveTimeline extends Component {
  render() {
    return (
      <div>
        <ContainerTitle title="项目状态" />
        <IceContainer>
          <Timeline className="project-timeline">
            <TimelineItem
              title="项目启动会"
              content={
                <div>
                  项目启动会的目标是明确该产品开发项目的目标。目标不是孤立存在的，目标与计划相辅相成，目标指导计划，计划的有效性影响着目标的达成。
                </div>
              }
              time="2016-06-10 10:30:00"
              state="process"
            />
            <TimelineItem
              title="用户需求"
              content="软件开始开发前需要确定代价和所获得价值的对比，也就是 ROI（Return On investment），一旦确定需要创建，就需要安排一系列的资源来支撑这个软件的生存。这是需求的最原始描述。"
              time="2016-06-10 09:30:00"
            />
            <TimelineItem
              title="产品需求"
              content="产品需求一般包括产品需求规格说明书和产品需求矩阵。产品需求矩阵一般按照子系统、功能集、执行单元的结构列出所有的功能需求，每列则对应每项功能的工作步骤以及每个步骤的工作量。"
              time="2016-06-10 09:03:00"
            />
            <TimelineItem
              title="总体设计"
              content="设计阶段包括了系统架构的输出，一个好的系统架构设计可以帮助人类梳理业务逻辑且抓住核心需求，设计稳定可扩展的业务系统，评估业务开发周期和开发成本，有效的规避风险。例如盖房子的时候得有建筑图纸，有了图纸，才能核算施工周期。"
              time="2016-06-10 06:10:00"
            />
            <TimelineItem
              title="概要设计"
              content="概要设计按照结构化设计方法进行设计。结构化设计方法的基本思路是：按照问题域，将软件逐级细化，分解为不必再分解的的模块，每个模块完成一定的功能，为一个或多个父模块服务（即接受调用），也接受一个或多个子模块的服务（即调用子模块）。模块的概念，和编程语言中的子程序或函数是对应的。"
              time="2016-06-09 18:00:00"
            />
            <TimelineItem
              title="详细设计"
              content="详细设计阶段就是依据概要设计阶段的分解，设计每个模块内的算法、流程，为每个模块完成的功能进行具体的描述，要把功能描述转变为精确的、结构化的过程描述。"
              time="2016-06-09 16:12:00"
            />
            <TimelineItem
              title="编写代码"
              content="不要沉迷于框架：框架最大的问题是什么？是过于繁冗的嵌套。为什么我一直很烦框架？因为经常遇到需要一秒钟几千次请求的处理场景，那么调优的时候，要从数不清的框架中寻找数据处理的逻辑，寻找性能卡点，可能改动代码只有两行，但是找问题需要两天。程序员记住，你的技术能力绝对不能被框架约束住。"
              time="2016-06-09 14:00:00"
            />
            <TimelineItem
              title="代码审核"
              content="众所周知，在团队中进行代码审查（Code Review）可以提升代码质量，分享项目知识、明确责任，最终达到构建更好的软件、更好的团队。"
              time="2016-06-09 10:12:19"
            />
            <TimelineItem
              title="产品发布"
              content="产品发布是系统测试结束后的最后一步，通常在软件产品开发过程中不需要产品试制环节，可以直接上线，只需要系统测试员输出系统测试报告并批准产品发布（上线）就可以了。"
              time="2016-06-09 10:01:09"
              icon="atm"
            />
          </Timeline>
        </IceContainer>
      </div>
    );
  }
}
