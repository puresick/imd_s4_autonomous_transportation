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
    var nfcStatus = null;

    var animationError = 'shake';
    var animationPayment = 'flash';
    var animationDoor = 'wobble';

    
    
    setTimeout(() => {
      setInterval(() => {
        $('.homeView--Logo--Element').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
      $('.homeView--Logo--Element')
        .removeClass('slideInDown')
        .removeClass(animationDoor)
        .removeClass(animationPayment)
        .removeClass(animationError)
      });


        $.get('http://localhost:8080/ajax', (data) => {
          console.log(data);
          nfcStatus = data;
        });

        if (nfcStatus == 'door') {
          console.log('fire door animation');
          $('.homeView--Logo--Element')
            .removeClass('slideInDown')
            .removeClass(animationPayment)
            .removeClass(animationDoor)
            .removeClass(animationError)
            .addClass(animationDoor);
        } else if (nfcStatus == 'payment') {
          console.log('fire payment animation');
          $('.homeView--Logo--Element')
            .removeClass('slideInDown')
            .removeClass(animationPayment)
            .removeClass(animationDoor)
            .removeClass(animationError)
            .addClass(animationPayment);   
        } else if (nfcStatus == 'error') {
          console.log('fire error animation');
          $('.homeView--Logo--Element')
            .removeClass('slideInDown')
            .removeClass(animationPayment)
            .removeClass(animationError)
            .removeClass(animationDoor)
            .addClass(animationError);
        } else {
          $('.homeView--Logo--Element')
            .removeClass('slideInDown')
            .removeClass(animationPayment)
            .removeClass(animationError)
            .removeClass(animationDoor)
        }
      }, 1000);
    }, 5000);
    
    
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
