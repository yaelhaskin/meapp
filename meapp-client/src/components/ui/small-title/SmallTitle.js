import * as React from "react";
import classes from "./SmallTitle.module.css";

const SmallTitle = (props) => {
  return <h3 className={classes["small-title"]}>{props.children}</h3>;
};

export default SmallTitle;
