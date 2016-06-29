import React from 'react'
import $ from 'jquery'
import animation from 'create-keyframe-animation'

export default class Logo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nfcStatus: null,
      nfcMode: 'payment'
    }
  }

  componentWillMount() {
    console.log('componentDidMount');
  }

  componentDidMount() {
    var _this = this;

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
    });

    animation.registerAnimation({
      name: 'zoomLogo',
      animation: [
        {
          scale: 1,
          opacity: 1
        },
        {
          scale: 4,
          opacity: 0
        }
      ],
      presets: {
        duration: 2000
      }
    });

    animation.registerAnimation({
      name: 'closePadlock',
      animation: [
        {
          opacity: 1
        },
        {
          opacity: 0
        },
        {
          opacity: 1
        },
        {
          opacity: 0
        }
      ],
      presets: {
        duration: 500
      }
    });

    animation.registerAnimation({
      name: 'openPadlock',
      animation: [
        {
          opacity: 0
        },
        {
          opacity: 1
        }
      ],
      presets: {
        duration: 2000
      }
    });

    setTimeout(() => {
      setInterval(() => {

        $.get('http://localhost:8080/ajax', (data) => {
          console.log(data);
          _this.setState({nfcStatus: data})
        });

        if (_this.state.nfcStatus == 'door') {
          animation.runAnimation($('.homeView--lock--closed'), 'closePadlock', () => {
            animation.runAnimation($('.homeView--lock--open'), 'openPadlock', () => {
            
              console.log('door open animation ended');
              setTimeout(() => {
                location.reload();
              }, 2000);
            });
            
          })
        } else if (_this.state.nfcStatus == 'payment') {
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
                  setTimeout(() => {
                    location.reload();
                  }, 2000);
                });
              });
            });
          });
        } else if (_this.state.nfcStatus == 'error') {

        }
      }, 1000);
    }, 5000);
  }

  render() {
    if (this.state.nfcMode == 'payment') {
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
    } else if (this.state.nfcMode == 'door') {
      return (
        <div className="homeView--Logo">
          <div className="homeView--lock--open">&nbsp;</div>
          
          <div className="homeView--lock--closed">&nbsp;</div>
        </div>
      )
    }
  }
}
