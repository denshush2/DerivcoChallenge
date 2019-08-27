import React from "react";
import styles from "./style.scss";
class Spinner extends React.Component {
  forceUpdateHandler = () => {
    this.reset();
  };

  /**
   * Reset
   * @description Reset the reel
   */
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
    lastPosition: null,
    iconHeight: 141
  };

  multiplier = Math.floor(Math.random() * (4 - 1) + 1);

  start = this.setStartPosition();
  speed = this.state.iconHeight * this.multiplier;

  /**
   * SetStartPosition
   * @description Reset And setup Start position of reel, if debug is enabled, recive the start position from parrent
   */
  setStartPosition() {
    console.log("THIs", this.props);
    if (this.props.debugMode === true) {
      return this.props.setupValue.position - this.props.setupValue.icon;
    } else {
      return Math.floor(Math.random() * 5) * this.state.iconHeight * -1;
    }
  }

  /**
   * Move Backgrount
   * @description MAGIC :P Css Animation
   */
  moveBackground() {
    this.setState({
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100
    });
  }

  /**
   * Get Symbol From Position
   * @description Getting symbol from the position and return to parent component
   */
  getSymbolFromPosition() {
    const totalSymbols = 5;
    const maxPosition = this.state.iconHeight * (totalSymbols - 1) * -1;
    let moved = (this.props.timer / 100) * this.multiplier;
    let startPosition = this.start;
    let currentPosition = startPosition;

    for (let i = 0; i < moved; i++) {
      currentPosition -= this.state.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }
    }
    this.props.onFinish(currentPosition, this.props.timer);
  }

  /**
   * Tick
   * @description Just tick the timer
   */
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
    let { position } = this.state;
    let { reel, redline } = this.props;

    return (
      <>
        <span
          className={
            //I didn't find the right solution for that redlines render. sorry about that, I know it's awful.
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
