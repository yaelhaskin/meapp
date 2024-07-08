import React from 'react';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import BlobImage from "../blob-image/BlobImage";

import SmallTitle from "../small-title/SmallTitle";
import SmallTitleItalic from "../small-title-italic/SmallTitleItalic";
import SubTitle from "../sub-title/SubTitle";
import BigText from "../big-text/BigText";

import classes from "./GallaryItem.module.css";

import { SingleProductContext } from "../../../pages/PageManager";

const GallaryItem = (props) => {
  const navigate = useNavigate();
  
  const { toggleBigDisplay, setToggleBigDisplay, setCurrProduct } = useContext(SingleProductContext);  
  
  const showBorder = { boxShadow: '20px 20px 76px -25px rgba(13, 24, 54, 10)', marginTop: '6%', width: '70%' }
  const hideBorder = { height: '100%', overflow: 'hidden'}

  const handleLinkClick = (event) => {
    let currItem = event.currentTarget;
        
    // checks display and opens link / singleProductPage accordingly
    if(toggleBigDisplay){
      window.open(props.productUrl, '_blank', 'noopener noreferrer')
    } else {
      // try to find smarter way (more understandable)
      let currUsedProduct = props.products.filter((item) => item["product_url"] === currItem.accessKey);
      navigateToSingleProductPage(currUsedProduct[0]);
    }
  }

  const handleMoreButtonClick = (event) => {
    let currUsedProduct = props.products.filter((product) => product["product_name"] === Number(event.currentTarget.id));
    navigateToSingleProductPage(currUsedProduct[0]);
  }
  
  const navigateToSingleProductPage = (currUsedProduct) => {
    setCurrProduct(currUsedProduct);
    setToggleBigDisplay(true);

    navigate(`/single-product`);
  }

  return (
    <div className={classes["gallary-item"]} style={toggleBigDisplay ? showBorder : hideBorder}>
      <div className={classes["image-wrapper"]} onClick={handleLinkClick} accessKey={props.productUrl}>
        <BlobImage className={classes["image"]} blobName={props.productName}/>
        {!toggleBigDisplay && <BlobImage className={classes["image-overlay"]} blobName={props.productName}/>}
      </div>
      <section className={classes["verbal-content-container"]}>
        <span onClick={toggleBigDisplay ? handleLinkClick : handleMoreButtonClick} className={classes[toggleBigDisplay ? "underline-title" : "title"]} id={props.id} accessKey={props.productUrl}>
          <SubTitle>{props.productName}</SubTitle>
        </span>
        <div className={classes["titles-container"]}>
          <SmallTitle>{props.productType}</SmallTitle>
          <SmallTitle>{props.productMegama}</SmallTitle>
          <SmallTitleItalic>{props.productAuthor}</SmallTitleItalic>
          <SmallTitleItalic>{String(props.productDate)}</SmallTitleItalic>
        </div>
        { toggleBigDisplay ? 
          <BigText className={classes["description"]}>{props.productDescription}</BigText>
          :
          <div className={classes["expand-btn"]}>
            <button onClick={handleMoreButtonClick} className={classes["expand-btn-text"]} id={props.id}> { " להרחבה" + " >" } </button>
          </div>
        }
      </section>
    </div>
  );
};

export default GallaryItem;
