import React, { useContext } from "react";

import SmallText from "../../../ui/small-text/SmallText";

import { FilterContext } from "../../../../pages/products-page/Products";
import classes from "./FilterButton.module.css";

const FilterButton = (props) => {  
  let { sortValue, setSortValue, handleFilterProducts } = useContext(FilterContext);

  const clicked = { backgroundColor: '#BD1C4D', color: 'white'}
  const disabled = { backgroundColor: '#C78FA6', color: 'black'}

  const handleBtnClick = (event) => {
    setSortValue(event.currentTarget.id);
    handleFilterProducts('product_type');
  }

  return (
    <div
      id={props.button.id}
      style={sortValue === props.button.id ? clicked : disabled}
      onClick={(event) => handleBtnClick(event)}
      className={classes["filter-button"]}
      >
      <SmallText className={classes["filter-button-text"]}>{props.button.text}</SmallText>
    </div>
  );
};

export default FilterButton;
