import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
import Root from './containers/Root'
import styles from './css/app.scss'

import $ from 'jquery'

import { Router, Route, Link, browserHistory } from 'react-router'

ReactDOM.render(
  <Root  routes={routes} />,
  document.getElementById('wrapper')
)
