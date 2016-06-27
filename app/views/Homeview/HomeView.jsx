import React from 'react'
import $ from 'jquery'
import Logo from '../../components/Logo.jsx'

export default class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div className='homeView'>
        <Logo />
      </div>
    )
  }
}
