import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { hashHistory } from 'react-router'

export default class Root extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        {this.props.routes}
      </Router>
    )
  }
}
