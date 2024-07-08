import React, { useState, createContext, useContext, useEffect } from "react";
import { filter, includes } from 'lodash/fp';

import BigTitle from "../../components/ui/big-title/BigTitle";
import GallaryItem from "../../components/ui/gallary-item/GallaryItem";
import NoProducts from "../../components/no-products/NoProducts.js";
import Searchbar from "../../components/product-filter-components/search-bar/Searchbar";
import FilterButtonsContainer from "../../components/product-filter-components/filter-buttons-container/FilterButtonsContainer";
import Dropdown from "../../components/product-filter-components/dropdown/Dropdown.js";

import Background from "../../assets/backgrounds/products-page.svg"
import classes from "./Products.module.css";
import { SingleProductContext } from "../PageManager.js";

export const FilterContext = createContext({ eventType: {}, sortValue: {}, setSortValue: () => {}, handleFilterProducts: (eventType) => {} });

const Products = ({products, currDisplay, setCurrDisplay, setCurrLink}) => {  
  const { setToggleBigDisplay } = useContext(SingleProductContext);  
  
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [megamaList, setMegamaList] = useState([]);
  const [sortValue, setSortValue] = useState("all");
  const [eventType, setEventType] = useState("product_type");

  const handleFilterProducts = (eventType) => {
    setEventType(eventType);
  }

  useEffect(() => {
    let afterFilterProducts = products;
    megamaList.length > 0 && (afterFilterProducts = filter((product) => (
      filter((selectedMegama) => (includes(selectedMegama, product[`product_megama`])), megamaList).length > 0
    ), afterFilterProducts));
    sortValue !== "all" && (afterFilterProducts = filter((product) => includes(sortValue, product[`${eventType}`]), afterFilterProducts));
    
    setDisplayedProducts(afterFilterProducts);
    setCurrDisplay({
      products: afterFilterProducts,
      megamaList: megamaList,
      sortValue: sortValue,
      eventType: eventType
    })
  }, [megamaList, sortValue, eventType]);

  useEffect(() => {
    setToggleBigDisplay(false);
    setCurrLink("products");

    if(JSON.parse(sessionStorage.getItem("currDisplay")) === null) {
      sessionStorage.setItem("currDisplay", JSON.stringify(currDisplay)); 
    } else {
      let currentDisplay = JSON.parse(sessionStorage.getItem("currDisplay"));
      setDisplayedProducts(currentDisplay.products);
      setMegamaList(currentDisplay.megamaList);
      setSortValue(currentDisplay.sortValue);
      setEventType(currentDisplay.eventType);
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem("currDisplay", JSON.stringify(currDisplay));
  }, [currDisplay])

  return (
    <div className={classes.ProductsPage}>
      <FilterContext.Provider value={{ eventType, sortValue, setSortValue, handleFilterProducts }}>
        <img src={Background} className={classes["background-image"]}/>
        <div className={classes.spacer}></div>
        <section className={classes["page-filters"]} >
          <BigTitle>תוצרים</BigTitle>
          <Searchbar products={products}/>
          <FilterButtonsContainer />
          <Dropdown megamaList={megamaList} setMegamaList={setMegamaList}/>
        </section>
        <section className={classes["card-section"]} >
          { displayedProducts.length > 0 
          ?
            displayedProducts.map((product) => (
              <div className={classes.galleryItem}>
                <GallaryItem
                  products = {products}
                  key={product["product_name"]}
                  id={product["product_name"]}
                  productName={product["product_name"]}
                  productAuthor={product["product_author"]}
                  productUrl={product["product_url"]}
                  productType={product["product_type"]}
                  productMegama={product["product_megama"]}
                  productDate={product["product_date"]}
                  productDescription={product["product_description"]}
                />   
              </div>
            ))
          :
            <NoProducts text={"איזה פאדיחה... אין פה כלום... \nדברו איתנו לשיתופי פעולה עתידיים"}/>
          }
        </section>
      </FilterContext.Provider>
    </div>
  );
};

export default Products;
