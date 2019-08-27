import React from "react";

export default props => {
  return (
    <button
      aria-label="Play again."
      id="repeatButton"
      onClick={props.onClick}
    />
  );
};
