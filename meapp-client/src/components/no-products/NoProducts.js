import React from 'react';
import SubTitle from '../ui/sub-title/SubTitle';

import classes from "./NoProducts.module.css"
import corgi100 from "../../assets/icons/corgi100.svg"

const NoProducts = ({ text }) => {
    return (
        <div className={classes.NoProducts}>
            <SubTitle style={{fontSize: "1.85rem", fontWeight: "350", textAlign: "center", lineHeight: "1.5"}}>
                {text} 
            </SubTitle>
            <img className={classes.corgi} src={corgi100} alt='corgi100' />
        </div>
    );
};

export default NoProducts;