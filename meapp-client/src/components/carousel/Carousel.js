import classes from "./Carousel.module.css";
import Arrow from "../ui/arrow/Arrow";
import useCarouselNavigation from "./useCarouselNavigation";
import GallaryItem from "../ui/gallary-item/GallaryItem";

const CarouselContainer = (props) => {

  const { pageNum, prevPage, nextPage } = useCarouselNavigation(props.products.length);
  const currentPage = props.products[pageNum];  

  return (
    <div className={classes["carousel-container"]}>
      <Arrow direction="left" onClick={prevPage} />
      <div style={{ height: "100%", width: "100%", }}>
        <GallaryItem
          products = {props.products}
          key={currentPage["product_name"]}
          id={currentPage["product_name"]}
          productName={currentPage["product_name"]}
          productAuthor={currentPage["product_author"]}
          productUrl={currentPage["product_url"]}
          productType={currentPage["product_type"]}
          productMegama={currentPage["product_megama"]}
          productDate={currentPage["product_date"]}
          productDescription={currentPage["product_description"]}
        />   
      </div>
      <Arrow direction="right" onClick={nextPage} />
    </div>
  );
};

export default CarouselContainer;


