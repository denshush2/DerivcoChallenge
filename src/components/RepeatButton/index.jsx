import React from "react";
import { Button } from 'reactstrap'

export default props => {
  return (
    // <button
    //   aria-label="Play again."
    //   id="repeatButton"
    //   onClick={props.onClick}
    // />
    <Button color="success" onClick={props.onClick}>Spin Again</Button>
  );
};
