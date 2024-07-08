import * as React from 'react';
import classes from "./SmallTitleItalic.module.css";

const SmallTitleItalic = (props) => {
  return (
    <h3 className={classes['small-title-italic']}>{props.children}</h3>
  );
};

export default SmallTitleItalic;
