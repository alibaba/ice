import React from 'react'
import { Link, useApp } from 'ice'

const Dashboard = () => {
  const app = useApp()
  console.log('render dashboard', { app })

  return (
    <>
      <h2>Dashboard Page...</h2>
      <Link to="/About">About</Link>
    </>
  )
}

export default Dashboard
