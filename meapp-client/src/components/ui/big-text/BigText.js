import * as React from 'react';
import classes from "./BigText.module.css";

const Text = (props) => {
  return (
    <p style={props.style} className={`${classes.text} ${props.className}`}>{props.children}</p>
  );
};

export default Text;