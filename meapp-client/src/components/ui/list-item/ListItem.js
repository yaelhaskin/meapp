import React from 'react';

import BlobItem from "../blob-image/BlobImage";
import SmallText from "../small-text/SmallText";

import classes from "./ListItem.module.css";

const ListItem = (props) => {
  return (
    <div className={classes["product-container"]}>
      <SmallText>{props.productName}</SmallText>
      <SmallText>{props.productAuthor}</SmallText>
      <SmallText style={{ textDecoration: "underline" }} onClick={() => window.open(props.productUrl, '_blank', 'noopener noreferrer')}>{props.productUrl}</SmallText>
      <SmallText>{props.productType}</SmallText>
      <SmallText>{props.productMegama}</SmallText>
      <SmallText>{String(props.productDate)}</SmallText>
      <BlobItem className={classes["image"]} blobName={props.productName}/>
      <SmallText className={classes["description"]}>{props.productDescription}</SmallText>
    </div>
  );
};

export default ListItem;
