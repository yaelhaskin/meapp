import React from 'react';

import classes from "./SearchList.module.css"

const SearchList = ({ suggestions, handleSelectSuggestion }) => {
    return (
        <div className={classes.searchList}>
            <ul>
                {suggestions.map((suggestion) => (
                <li className={classes.listItem} key={suggestion} onClick={() => handleSelectSuggestion(suggestion)}>
                    {suggestion}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchList;