import React, { Component, Suspense } from 'react';
import PageLoading from '../../components/PageLoading';

const Overivew = React.lazy(() => import('./components/Overivew'));
const TabChart = React.lazy(() => import('./components/TabChart'));
const EditableTable = React.lazy(() => import('./components/EditableTable'));
const LatestActivity = React.lazy(() => import('./components/LatestActivity'));
const ProjectAnalysis = React.lazy(() =>
  import('./components/ProjectAnalysis')
);
const PieDoughnutChart = React.lazy(() =>
  import('./components/PieDoughnutChart')
);

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-page">
        <Suspense fallback={<PageLoading />}>
          <Overivew />
        </Suspense>
        <Suspense fallback={null}>
          <TabChart />
        </Suspense>
        <Suspense fallback={null}>
          <LatestActivity />
        </Suspense>
        <Suspense fallback={null}>
          <ProjectAnalysis />
        </Suspense>
        <Suspense fallback={null}>
          <EditableTable />
        </Suspense>
        <Suspense fallback={null}>
          <PieDoughnutChart />
        </Suspense>
      </div>
    );
  }
}
