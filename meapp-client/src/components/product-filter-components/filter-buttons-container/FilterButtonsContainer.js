import * as React from "react";
import FilterButton from "./filter-button/FilterButton";
import content from "../../../data/content.json";

const FilterButtonsContainer = (props) => {
  const filterButtons = content.filterButtons;

  return (
    <div style={{ display: "flex" }}>
      {filterButtons.map((button) => (
        <FilterButton button={button} key={button.id} />
      ))}
    </div>
  );
};

export default FilterButtonsContainer;
