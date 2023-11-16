import * as React from "react";
import { ButtonProps } from "./types";

import "./index.css";

const Button: React.FC<ButtonProps> = ({
  styles,
  text,
  handleClick,
}): JSX.Element => {
  return (
    <button style={styles || {}} className="Button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
