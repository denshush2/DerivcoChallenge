import React, { Component } from "react";
import { Input, Button, Container, FormGroup, Label, Row, Col, InputGroup, Nav, NavItem, InputGroupAddon, Navbar, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap'
import constants from "./sloMachieConsts";
import { checkResult } from "./functions";
import RepeatButton from "../../components/RepeatButton";
import Spinner from "../../components/Spinner";

class SlotMachine extends Component {
  state = {
    totalHeight: 705,
    reels: [],
    winner: {},
    reelsOn: true,
    gameStart: false,
    playerCanEditBalance: false,
    player: {
      name: "Random Name",
      balance: 1000
    },
    debugMode: false,
    staticIcons: [
      {
        position: 0,
        icon: 0
      },
      {
        position: 0,
        icon: 0
      },
      {
        position: 0,
        icon: 0
      }
    ],
    firstSpin: true,
    navBarOpen: true
  };
  /**
   * Handle Click
   * @description just update and reset the reels
   */
  handleClick = () => {
    this.setState(state => ({
      ...state,
      player: {
        ...state.player,
        balance: state.player.balance - 1
      },
      winner: {},
      reels: [],
      reelsOn: true
    }));
    this._child0.forceUpdateHandler();
    this._child1.forceUpdateHandler();
    this._child2.forceUpdateHandler();
  };
  movePositionResult = timer => {
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
  };
  /**
   * FindPosition
   * @description Find the position of icons
   * @param {number} position
   */
  findPosition = position => {
    const currentPos = Math.abs(position % this.state.totalHeight);
    const result =
      constants.reelPositions1.findIndex(item => currentPos === item) + 2;
    let reel = [];
    if (result === 5) {
      reel = constants.positions["0"];
    } else if (result === 6) {
      reel = constants.positions["1"];
    } else {
      reel = constants.positions[result];
    }
    this.setState(state => ({
      ...state,
      reels: [...state.reels, reel]
    }));
  };
  /**
   * Finish Handler
   * @description Finish the reels and find the result
   * @param {number} value
   * @param {number} timer
   */
  finishHandler = async (value, timer) => {
    try {
      this.findPosition(value);
      const result = checkResult(this.state.reels);
      if (timer === 3000) {
        console.log(checkResult(this.state.reels));
        if (this.state.firstSpin) {
          this.setState({ firstSpin: false, reelsOn: false });
        } else {
          this.setState(state => ({
            ...state,
            winner: result,
            reelsOn: false,
            player: {
              ...state.player,
              balance: result.value + state.player.balance
            }
          }));
        }
      }
    } catch (e) {
      console.log("Error", e);
    }
  };
  render() {
    const {
      winner,
      player,
      reelsOn,
      staticIcons,
      gameStart,
      debugMode,
      playerCanEditBalance,
      navBarOpen
    } = this.state;
    return (
      <div>
        <Navbar>
          <NavbarBrand>Dervico Slot-Machine</NavbarBrand>
          <NavbarToggler onClick={() => { this.setState((state) => ({ ...state, navBarOpen: !navBarOpen })) }} />
          <Collapse isOpen={navBarOpen}>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <Input
                      readOnly={!playerCanEditBalance}
                      onChange={event => {
                        let value = event.target.value;
                        if (value > 0 && value < 5000) {
                          console.log(event.target.value);
                          this.setState(state => ({
                            ...state,
                            player: {
                              ...state.player,
                              balance: value
                            }
                          }));
                        }
                      }} value={player.balance} type="number" min="1" max="5000" />
                    <Button onClick={() => {
                      this.setState({ playerCanEditBalance: !playerCanEditBalance });
                    }} color={playerCanEditBalance ? "success" : "primary"}>{playerCanEditBalance ? "Save" : "Load"}</Button>
                  </InputGroupAddon>
                </InputGroup>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Container>
          <Row>
            <Col>
              {!gameStart ? (
                <Button color="success" onClick={() => this.setState({ gameStart: true })}>Start Game</Button>
              ) : (
                  <div>Game Started</div>
                )}
            </Col>
            <Col>
              {reelsOn && player.balance > 0 ? (
                <div></div>
              ) : (
                  <RepeatButton onClick={this.handleClick} />
                )}
            </Col>
            <Col>
              {winner.msg !== undefined && (<h3>Winner: {winner.msg}</h3>)}
            </Col>

          </Row>
        </Container>
        <div>
          <h3></h3>


        </div>
        {gameStart ? (
          <div className="spinner-container line-reelOne-top">
            {Object.keys(constants.timer).map((item, index) => (
              <Spinner
                key={index}
                onFinish={this.finishHandler}
                setupValue={staticIcons[index]}
                debugMode={debugMode}
                reelsOn={reelsOn}
                reel={index}
                redline={
                  winner.msg !== undefined ? winner.redlines[index] : null
                }
                ref={child => {
                  this["_child" + index] = child;
                }}
                timer={constants.timer[item]}
              />
            ))}
            <div className="gradient-fade" />
          </div>
        ) : (
            <div>Press the button Start</div>
          )}
        <div>
          <p>
            <Button color="primary" onClick={() => {
              this.setState({ debugMode: !this.state.debugMode });
            }}>Debug Mode {debugMode ? "ON" : "Off"}</Button>
          </p>
          {debugMode ? (
            <Container>
              <Row>
                <Col sm="4">
                  <FormGroup>
                    <Label for="reelOne"><b>ReelOne</b></Label>
                    <Input id="reelOne" type='select'
                      onChange={event => {
                        let newStaticIcons = staticIcons.slice();
                        newStaticIcons[0].position = event.target.value;
                        this.setState(state => ({
                          ...state,
                          staticIcons: newStaticIcons
                        }));
                      }}
                      defaultValue={0}>
                      <option value={0}>Top</option>
                      <option value={141}>Center</option>
                      <option value={282}>Bottom</option>
                    </Input>
                    <Input
                      type='select'
                      onChange={event => {
                        let newStaticIcons = staticIcons.slice();
                        newStaticIcons[0].icon = event.target.value;
                        this.setState(state => ({
                          ...state,
                          staticIcons: newStaticIcons
                        }));
                      }}
                      defaultValue={0}
                    >
                      <option value={0}>Tripple Bar</option>
                      <option value={141}>BAR</option>
                      <option value={282}>Double Bar</option>
                      <option value={423}>Seven</option>
                      <option value={564}>Cherry</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <FormGroup>
                    <Label for="reelTwo"><b>ReelTwo</b></Label>
                    <Input
                      type="select"
                      onChange={event => {
                        let newStaticIcons = staticIcons.slice();
                        newStaticIcons[1].position = event.target.value;
                        this.setState(state => ({
                          ...state,
                          staticIcons: newStaticIcons
                        }));
                      }}
                      defaultValue={0}
                    >
                      <option value={0}>Top</option>
                      <option value={141}>Center</option>
                      <option value={282}>Bottom</option>
                    </Input>
                    <Input
                      type="select"
                      onChange={event => {
                        let newStaticIcons = staticIcons.slice();
                        newStaticIcons[1].icon = event.target.value;
                        this.setState(state => ({
                          ...state,
                          staticIcons: newStaticIcons
                        }));
                      }}
                      defaultValue={0}
                    >
                      <option value={0}>Tripple Bar</option>
                      <option value={141}>BAR</option>
                      <option value={282}>Double Bar</option>
                      <option value={423}>Seven</option>
                      <option value={564}>Cherry</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm="4">
                  <FormGroup>
                    <Label for="reelThree"><b>Reel Three</b></Label>

                    <Input
                      type="select"
                      onChange={event => {
                        let newStaticIcons = staticIcons.slice();
                        newStaticIcons[2].position = event.target.value;
                        this.setState(state => ({
                          ...state,
                          staticIcons: newStaticIcons
                        }));
                      }}
                      defaultValue={0}
                    >
                      <option value={0}>Top</option>
                      <option value={141}>Center</option>
                      <option value={282}>Bottom</option>
                    </Input>
                    <Input
                      type="select"
                      onChange={event => {
                        let newStaticIcons = staticIcons.slice();
                        newStaticIcons[2].icon = event.target.value;
                        this.setState(state => ({
                          ...state,
                          staticIcons: newStaticIcons
                        }));
                      }}
                      defaultValue={0}
                    >
                      <option value={0}>Tripple Bar</option>
                      <option value={141}>BAR</option>
                      <option value={282}>Double Bar</option>
                      <option value={423}>Seven</option>
                      <option value={564}>Cherry</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          ) : (
              <div></div>
            )}
        </div>
      </div>
    );
  }
}
export default SlotMachine;
