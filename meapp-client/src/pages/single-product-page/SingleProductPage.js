import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SingleProductContext } from "../../pages/PageManager";

import classes from "./SingleProductPage.module.css";

import Background from "../../assets/backgrounds/single-product-page.svg";
import SVGImage from "../../assets/backgrounds/controller.svg";
import GallaryItem from "../../components/ui/gallary-item/GallaryItem";

const SingleProductPage = (props) => {
  const navigate = useNavigate();
  const { currProduct, setToggleBigDisplay  } = useContext(SingleProductContext);

  const handleBackButtonClick = () => {
    setToggleBigDisplay(false);
    navigate(-1);
  };
  
  return (
    <div className={classes["page-container"]}>
        <img src={Background} className={classes["background-image"]} />
        <img src={SVGImage} className={classes["svg-image"]} />
        <button
          onClick={handleBackButtonClick}
          className={classes["back-btn-text"]}
        >
          {" < " + " חזרה"}
        </button>
        <div className={classes["gallary-item"]}>
          <GallaryItem
            key={currProduct["product_name"]}
            id={currProduct["product_name"]}
            productName={currProduct["product_name"]}
            productAuthor={currProduct["product_author"]}
            productUrl={currProduct["product_url"]}
            productType={currProduct["product_type"]}
            productMegama={currProduct["product_megama"]}
            productDate={currProduct["product_date"]}
            productDescription={currProduct["product_description"]}
          />   
        </div>
    </div>
  );
};

export default SingleProductPage;
