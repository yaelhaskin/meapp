import * as React from "react";
import classes from "./SubTitle.module.css";

const SubTitle = (props) => {
  return <h2 style={props.style} className={classes["sub-title"]}>{props.children}</h2>;
};

export default SubTitle;
