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


    //$('.homeView--subline--element').animate({width: '10%'}, 2000);

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
        <div className="homeView--club--element animated slideInDown">
          <div>&nbsp;</div>
        </div>

        <div className="homeView--subline--element">
          <div className="homeView--subline--element--child ani1">&nbsp;</div>
          <div className="homeView--subline--element--child ani2">&nbsp;</div>
          <div className="homeView--subline--element--child ani3">&nbsp;</div>
          <div className="homeView--subline--element--child ani4">&nbsp;</div>
          <div className="homeView--subline--element--child ani5">&nbsp;</div>
          <div className="homeView--subline--element--child ani6">&nbsp;</div>
        </div>
        
        <div className="homeView--Logo--Element animated slideInUp">
          <div>&nbsp;</div>
        </div>
      </div>
    )
  }
}
