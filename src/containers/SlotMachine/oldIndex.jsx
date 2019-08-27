import React from "react";

import constants from "./sloMachieConsts";
import RepeatButton from "../../components/RepeatButton";
import WinningSound from "../../components/WinningSound";
import Spinner from "../../components/Spinner";

class SlotMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null
        };
        this.finishHandler = this.finishHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ winner: null });
        this.emptyArray();
        // console.log("this", this);
        this._child0.forceUpdateHandler();
        this._child1.forceUpdateHandler();
        this._child2.forceUpdateHandler();
    }

    static loser = [
        "Not quite",
        "Stop gambling",
        "Hey, you lost!",
        "Ouch! I felt that",
        "Don't beat yourself up",
        "There goes the college fund",
        "I have a cat. You have a loss",
        "You're awesome at losing",
        "Coding is hard",
        "Don't hate the coder"
    ];

    static matches = [];
    static totalHeight = 705;

    movePositionResult(timer) {
        if (timer === 2000) {
            return 0;
        }
        if (timer === 2500) {
            return 1;
        }
        if (timer === 3000) {
            return 2;
        } else {
            return 0;
        }
    }

    findPosition(position, timer) {
        // console.log("Pos", position, this.movePositionResult(timer));
        const currentPos = Math.abs(position % SlotMachine.totalHeight);
        const result =
            constants.reelPositions1.findIndex(item => currentPos === item) + 2;
        if (result === 5) {
            console.log("Result 0", constants.positions["0"]);
        } else if (result === 6) {
            console.log("Result 1", constants.positions["1"]);
        } else {
            console.log("Result", constants.positions[result]);
        }
    }

    finishHandler(value, timer) {
        SlotMachine.matches.push(value);
        // console.log("MATCHES", value, timer);
        this.findPosition(value, timer);
        // console.log(value);
        // if (SlotMachine.matches.length === 3) {
        //   const { winner } = this.state;
        //   const first = SlotMachine.matches[0];
        //   let results = SlotMachine.matches.every(match => match === first);
        //   this.setState({ winner: results });
        // }
    }

    emptyArray() {
        SlotMachine.matches = [];
    }

    render() {
        const { winner } = this.state;
        const getLoser = () => {
            return SlotMachine.loser[
                Math.floor(Math.random() * SlotMachine.loser.length)
            ];
        };
        let repeatButton = null;
        let winningSound = null;

        if (winner !== null) {
            repeatButton = <RepeatButton onClick={this.handleClick} />;
        }

        if (winner) {
            winningSound = <WinningSound />;
        }

        return (
            <div>
                {winningSound}
                <h1 style={{ color: "white" }}>
                    <span>
                        {winner === null
                            ? "Waiting…"
                            : winner
                                ? "🤑 Pure skill! 🤑"
                                : getLoser()}
                    </span>
                </h1>

                <div className={`spinner-container`}>
                    {Object.keys(constants.timer).map((item, index) => (
                        <Spinner
                            key={index}
                            onFinish={this.finishHandler}
                            ref={child => {
                                this["_child" + index] = child;
                            }}
                            timer={constants.timer[item]}
                        />
                    ))}
                    <div className="gradient-fade" />
                </div>
                {repeatButton}
            </div>
        );
    }
}
export default SlotMachine;
