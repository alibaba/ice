import React from 'react'
import { Link, useApp, useAboutPage } from 'ice'

const Child = () => {
  const app = useApp()
  const page = useAboutPage()
  console.log('render about child', { app, page });
  return (
    <div>
      Child
    </div>
  )
}

const About = () => {
  const app = useApp()
  const page = useAboutPage()
  console.log('render about', { app, page })

  return (
    <>
      <h2>About Page</h2>
      <Child />
      <Link to="/about">About</Link><br />
      <Link to="/">Home</Link>
    </>
  )
}

export default About
