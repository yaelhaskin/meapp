import React from 'react';
import classes from "./BigTitle.module.css";

const BigTitle = (props) => {
  return (
    <h1 style={props.style} className={classes['big-title']}>{props.children}</h1>
  );
};

export default BigTitle;