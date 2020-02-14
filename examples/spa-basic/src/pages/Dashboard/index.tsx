import React from 'react'
import { Link, useApp, useDashboardPage } from 'ice'

const Dashboard = () => {
  const app = useApp()
  const page = useDashboardPage()
  console.log('render dashboard', { app, page })

  return (
    <>
      <h2>Dashboard Page...</h2>
      <Link to="/About">About</Link>
    </>
  )
}

export default Dashboard
