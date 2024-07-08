import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import Carousel from "../../components/carousel/Carousel";
import BigText from "../../components/ui/big-text/BigText";
import BigTitle from "../../components/ui/big-title/BigTitle";

import SVGImage1 from "../../assets/backgrounds/controller.svg";
import SVGImage2 from "../../assets/backgrounds/play-button.svg";
import SVGImage3 from "../../assets/backgrounds/cursor.svg";

import classes from "./HomePage.module.css";
import content from "../../data/content.json";

import { SingleProductContext } from "../../pages/PageManager";

const HomePage = (props) => {
  const homepageContent = content.homepage;
  const [mouseHover, setMouseHover] = useState(false);
  const navigate = useNavigate();
  let {  setToggleBigDisplay  } = useContext(SingleProductContext);

  const handleProductPageButtonClick = () => {
    setToggleBigDisplay(false);
    navigate(`/products`);
  }

  const handleHoverOverButton = () => {
    setMouseHover((prevState) => !prevState);   
  }

  useEffect(() => {
    setToggleBigDisplay(false);
  }, [])

  return (
    <div className={classes["homepage-container"]}>
        <div className={classes["bg-gradient-shape"]} />
        <img src={SVGImage1} className={classes["svg-image1"]}/>
        <img src={SVGImage2} className={classes["svg-image2"]}/>
        <img src={SVGImage3} className={classes["svg-image3"]}/>
        <div className={classes.spacer}></div>
        <main className={classes["intro-text-container"]}>
            <section className={classes["text-section"]}>
                <BigTitle>
                    <span className={classes["pink-letter"]}>מ</span>ולטימדיה ו
                    <span className={classes["pink-letter"]}>א</span>ינטרקטיביות ב
                    <span className={classes["pink-letter"]}>ה</span>דרכה
                </BigTitle>
                <BigText>{homepageContent.introText}</BigText>
                <button
                    onMouseEnter={handleHoverOverButton}
                    onMouseLeave={handleHoverOverButton}
                    onClick={handleProductPageButtonClick}
                    className={classes["product-page-button"]}
                >
                    לכל התוצרים
                    {mouseHover && " > "}
                </button>
            </section>
            <article>
                <Carousel products={props.products}/>
            </article>
        </main>
    </div>
  );
};

export default HomePage;
