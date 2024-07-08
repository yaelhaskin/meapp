import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { filter, map, get } from 'lodash/fp';

import SearchList from "../../ui/search-list/SearchList";

import { FilterContext } from "../../../pages/products-page/Products";
import SearchIcon from "../../../assets/icons/search-icon.svg";

import classes from "./Searchbar.module.css";

const Searchbar = ({ products }) => {
  let { eventType, sortValue, setSortValue, handleFilterProducts } = useContext(FilterContext);

  const [inputValue, setInputValue] = useState(sortValue);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = (value) => {
    const filteredSuggestions = filter((product) => product[`product_name`].toLowerCase().startsWith(value.toLowerCase()), products);
    const filteredSuggestionsName = map((product) => get(`product_name`, product), filteredSuggestions);
    setSuggestions(filteredSuggestionsName);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setSortValue(suggestion);
    handleFilterProducts('product_name');
  };

  const handleSubmit = (event) => {
    event.preventDefault();    
    setSortValue(inputValue);
    handleFilterProducts('product_name');
  }

  useEffect(() => {
    if(eventType === "product_name") {
      setInputValue(sortValue);
    } else {
      setInputValue("");
    }
  }, [eventType, sortValue])
  
  return (
    <div>
      <form onSubmit={handleSubmit} className={classes["search-container"]}>
        <input
          placeholder="חפשו כאן תוצרים"
          className={classes["searchbar"]}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <input
          type="image"
          alt="Submit"
          src={SearchIcon}
          className={classes["search-icon"]}
        />
      </form>
      {inputValue && <SearchList suggestions={suggestions} handleSelectSuggestion={handleSelectSuggestion}/>}
    </div>
  );
};

export default Searchbar;


