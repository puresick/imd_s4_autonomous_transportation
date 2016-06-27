import React from 'react'
import $ from 'jquery'

export default class Logo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animationClass: "wobble"
    }
  }

  

  componentDidMount() {
    $('.homeView--Logo--Element').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
      $('.homeView--Logo--Element')
        .removeClass('slideInDown')
        .addClass(this.state.animationClass);
    });
  }

  render() {
    return(
      <div className="homeView--Logo">
        <div className="homeView--Logo--Element animated slideInDown">
          <div>&nbsp;</div>
        </div>
      </div>
    )
  }
}
