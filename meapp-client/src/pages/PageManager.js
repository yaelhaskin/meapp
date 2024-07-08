import { createContext, useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { Routes, Route } from "react-router-dom";

import { navItems } from "../data/app-variables.js";
import Navbar from "../components/navbar/Navbar";
import Homepage from "./home-page/HomePage";
import Products from "./products-page/Products";
import SingleProductPage from "./single-product-page/SingleProductPage";
import MeetTheGang from "./nav-pages/meet-the-gang-page/MeetTheGang";
import AddNewProduct from "./add-new-product-page/AddNewProduct";
import ApproveProducts from "./approve-products-page/ApproveProducts.js";

import ComingSoon from "./nav-pages/coming-soon-page/ComingSoon";

import { getProducts } from "../data/requests.js"

export const SingleProductContext = createContext({ toggleBigDisplay: false, setToggleBigDisplay: () => {}, currProduct: [], setCurrProduct: () => {} });

function PageManager() {
  const { data: products, isLoading } = useQuery({ queryKey: ['products'], queryFn: () => getProducts() });  
  
  const [currDisplay, setCurrDisplay] = useState({
    products: [],
    megamaList: [],
    sortValue: "all",
    eventType: "product_type"
  });

  const [currProduct, setCurrProduct] = useState({});  
  const [toggleBigDisplay, setToggleBigDisplay] = useState(false);
  const [currLink, setCurrLink] = useState("");    

  useEffect(() => {
    if(JSON.parse(sessionStorage.getItem("currProduct")) === null) {
      sessionStorage.setItem("currProduct", {}); 
    } else {
      setCurrProduct(JSON.parse(sessionStorage.getItem("currProduct")));
    }
    
    if(JSON.parse(sessionStorage.getItem("toggleDisplay")) === null) {
      sessionStorage.setItem("toggleDisplay", JSON.stringify(toggleBigDisplay)); 
    } else {
      setToggleBigDisplay(JSON.parse(sessionStorage.getItem("toggleDisplay")));
    }

    if(JSON.parse(sessionStorage.getItem("navLink")) === null) {
      sessionStorage.setItem("navLink", JSON.stringify(currLink)); 
    } else {
      setCurrLink(JSON.parse(sessionStorage.getItem("navLink")));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("currProduct", JSON.stringify(currProduct));
  }, [currProduct]);

  useEffect(() => {
    sessionStorage.setItem("toggleDisplay", JSON.stringify(toggleBigDisplay));
  }, [toggleBigDisplay]);

  useEffect(() => {
    sessionStorage.setItem("navLink", JSON.stringify(currLink));
  }, [currLink]);

  return (
    <>
        {isLoading ?
          <span style={{ position: "absolute", height: "0%" }}>Loading</span>
        :
          <SingleProductContext.Provider value={{ toggleBigDisplay, setToggleBigDisplay, currProduct, setCurrProduct }}>
            {!toggleBigDisplay && <Navbar navItems={navItems} currLink={currLink} setCurrLink={setCurrLink}/>}
            <Routes>
              <>
              <Route
                path="/"
                element={<Homepage products={products} mouseHover={false} />} 
              />
              <Route 
                path="/products" 
                element={<Products 
                          products={products} 
                          currDisplay={currDisplay} 
                          setCurrDisplay={setCurrDisplay}
                          setCurrLink={setCurrLink}
                        />} 
              />
              </>
              <Route
                path="/single-product"
                element={<SingleProductPage />}
              />
              <Route
                path="/coming-soon"
                element={<ComingSoon />}
              />
              <Route
                path="/meet-the-gang"
                element={<MeetTheGang />}
              />
              <Route
                path="/add-new-product"
                element={<AddNewProduct setCurrLink={setCurrLink}/>}
              />
              <Route
                path="/approve-products"
                element={<ApproveProducts setCurrLink={setCurrLink}/>}
              />
            </Routes>
          </SingleProductContext.Provider>
        }
    </>
  );
}

export default PageManager;
