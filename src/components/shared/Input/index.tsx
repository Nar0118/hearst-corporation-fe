import * as React from "react";
import { InputProps } from "./types";

import "./index.css";

const Input: React.FC<InputProps> = ({
  type,
  styles,
  label,
  handleChange,
}): JSX.Element => {
  return (
    <div className="inputContainer" style={styles || {}}>
      <p className="label">{label}</p>
      <input
        className="input"
        type={type || "text"}
        onChange={(evt) => handleChange(evt.target.value)}
      />
    </div>
  );
};

export default Input;
