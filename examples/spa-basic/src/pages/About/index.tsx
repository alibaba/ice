import React from 'react'
import { Link, store as appStore } from 'ice'
import { store as pageStore } from 'ice/About'

const Child = () => {
  const [userState, useActions] = appStore.useModel('user')
  const [pageState, pageActions] = pageStore.useModel('default')
  console.log('render about child', { userState, useActions, pageState, pageActions });
  return (
    <div>
      Child
    </div>
  )
}

const About = () => {
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
