import React from "react";
import styles from "./style.scss";
class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  forceUpdateHandler() {
    this.reset();
  }

  reset() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.start = this.setStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  state = {
    position: 0,
    lastPosition: null
  };
  static iconHeight = 141;
  static doubleHeight = 0;

  multiplier = Math.floor(Math.random() * (4 - 1) + 1);

  start = this.setStartPosition();
  speed = Spinner.iconHeight * this.multiplier;

  setStartPosition() {
    console.log("THIs", this.props);
    if (this.props.debugMode === true) {
      return this.props.setupValue.position - this.props.setupValue.icon;
    } else {
      // return Spinner.iconHeight;
      return Math.floor(Math.random() * 5) * Spinner.iconHeight * -1;
    }
    // return
    // console.log("SPINNER", Spinner.iconHeight);
  }

  moveBackground() {
    this.setState({
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100
    });
  }

  getSymbolFromPosition() {
    let { position } = this.state;
    const totalSymbols = 5;
    const maxPosition = Spinner.iconHeight * (totalSymbols - 1) * -1;
    let moved = (this.props.timer / 100) * this.multiplier;
    let startPosition = this.start;
    let currentPosition = startPosition;

    for (let i = 0; i < moved; i++) {
      currentPosition -= Spinner.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }
    }
    // console.log("Current Position", this.props);
    this.props.onFinish(currentPosition, this.props.timer);
  }

  tick() {
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);
      this.getSymbolFromPosition();
    } else {
      this.moveBackground();
    }
  }

  componentDidMount() {
    clearInterval(this.timer);

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  render() {
    let { position, current } = this.state;
    let { reel, redline } = this.props;

    return (
      <>
        <span
          className={
            (reel === 0 && redline === 1 && " redLine-reelOne-top ") +
            (reel === 1 && redline === 1 && " redLine-reelTwo-top ") +
            (reel === 2 && redline === 1 && " redLine-reelThree-top ") +
            (reel === 0 && redline === 2 && " redLine-reelOne-center ") +
            (reel === 1 && redline === 2 && " redLine-reelTwo-center ") +
            (reel === 2 && redline === 2 && " redLine-reelThree-center ") +
            (reel === 0 && redline === 3 && " redLine-reelOne-bottom ") +
            (reel === 1 && redline === 3 && " redLine-reelTwo-bottom ") +
            (reel === 2 && redline === 3 && " redLine-reelThree-bottom ")
          }
        />
        <div
          style={{ backgroundPosition: "0px " + position + "px" }}
          className={`icons`}
        />
      </>
    );
  }
}
export default Spinner;
