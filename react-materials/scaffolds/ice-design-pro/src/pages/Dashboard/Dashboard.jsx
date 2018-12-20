import React, { Component, Suspense } from 'react';
import PageLoading from '../../components/PageLoading';

const DisplayCard = React.lazy(() => import('./components/DisplayCard'));
const TabChart = React.lazy(() => import('./components/TabChart'));
const EditableTable = React.lazy(() => import('./components/EditableTable'));
const LatestActivity = React.lazy(() => import('./components/LatestActivity'));
const PieDoughnutChart = React.lazy(() =>
  import('./components/PieDoughnutChart')
);

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-page">
        <Suspense fallback={<PageLoading />}>
          <DisplayCard />
        </Suspense>
        <Suspense fallback={null}>
          <TabChart />
        </Suspense>
        <Suspense fallback={null}>
          <LatestActivity />
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
