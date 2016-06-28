import React from 'react'
import $ from 'jquery'
import animation from 'create-keyframe-animation'

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

    var windowWidth = $(document).width() - 600;

    animation.registerAnimation({
      name: 'moneyLeft',
      animation: [
        {
          translate: [0, 0],
          opacity: 0,
          rotate: 0
        },
        {
          opacity: 1
        },
        {
          translate: [windowWidth, 0],
          opacity: 0,
          rotate: 50
        }
      ],
      presets: {
        duration: 2000,
        delay: 0
      }
    });

    animation.registerAnimation({
      name: 'moneyRight',
      animation: [
        {
          translate: [0, 0],
          opacity: 0,
          rotate: 0
        },
        {
          opacity: 1
        },
        {
          translate: [windowWidth + 200, 0],
          opacity: 0,
          rotate: -50
        }
      ],
      presets: {
        duration: 2000,
        delay: 0
      }
    });

    animation.registerAnimation({
      name: 'acceptWearable',
      animation: [
        {
          translate: [10, 0]
        },
        {
          translate: [-10, 0]
        },
        {
          translate: [10, 0]
        },
        {
          translate: [-10, 0]
        },
        {
          translate: [10, 0]
        },
        {
          translate: [-10, 0]
        },
        {
          translate: [10, 0]
        },
        {
          translate: [-10, 0]
        },
      ],
      presets: {
        duration: 500,
        delay: 0
      }
    });


    animation.registerAnimation({
      name: 'acceptClub',
      animation: [
        {
          opacity: 0
        },
        {
          opacity: 1
        }
      ],
      presets: {
        duration: 500,
        delay: 0
      }
    })


    
    //$('.homeView--subline--element').animate({width: '10%'}, 2000);
    setTimeout(() => {
      setInterval(() => {

        $.get('http://localhost:8080/ajax', (data) => {
          console.log(data);
          nfcStatus = data;
        });

        if (nfcStatus == 'door') {

        } else if (nfcStatus == 'payment') {
          animation.runAnimation($('.ani1'), 'moneyRight', () => {
            animation.runAnimation($('.ani2'), 'moneyRight', () => {
              animation.runAnimation($('.ani5'), 'moneyRight', () => {
                animation.runAnimation($('.homeView--Logo--Element'), 'acceptWearable', () => {
                  console.log('ende');
                });
              });
            });
          });

          animation.runAnimation($('.ani3'), 'moneyLeft', () => {
            animation.runAnimation($('.ani4'), 'moneyLeft', () => {
              animation.runAnimation($('.ani6'), 'moneyLeft', () => {
                animation.runAnimation($('.acceptDone'), 'acceptClub', () => {
                  console.log('ende');
                });
              });
            });
          });
        } else if (nfcStatus == 'error') {

        } else {

        }
      }, 1000);
    }, 5000);


  }

  render() {
    return(
      <div className="homeView--Logo">
        <div className="homeView--Logo--Element">
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

        <div className="homeView--club--element">
          <div className="acceptDone">&nbsp;</div>
        </div>

      </div>
    )
  }
}
