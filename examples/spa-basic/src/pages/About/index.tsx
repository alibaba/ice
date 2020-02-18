import React from 'react'
import { Link, useApp, store, useAboutPage } from 'ice'

const Child = () => {
  const { store: pageStore } = useAboutPage()
  const [userState, useActions] = store.useModel('user')
  const [pageState, pageActions] = pageStore.useModel('default')
  console.log('render about child', { userState, useActions, pageState, pageActions });
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
