import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import HomeView from '../views/Homeview/HomeView.jsx'

export default (
  <Route path='*'>
    <IndexRoute component={HomeView} />
  </Route>
)
