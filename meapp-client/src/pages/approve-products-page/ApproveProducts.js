import React, { useState, useEffect, } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from "react-router";

import ListItem from '../../components/ui/list-item/ListItem';
import NoProducts from '../../components/no-products/NoProducts';
import BigTitle from '../../components/ui/big-title/BigTitle';

import Background from "../../assets/backgrounds/single-product-page.svg";
import SVGImage1 from "../../assets/backgrounds/play-button.svg";
import SVGImage2 from "../../assets/backgrounds/add-new-product-page.svg";

import classes from "./ApproveProducts.module.css"
import data from "../../data/content.json"

import { getWaitingProducts } from "../../data/requests"
import { postNewApprove } from "../../data/requests.js"

const ApproveProducts = ({ setCurrLink }) => {
    const { data: waitingProducts } = useQuery({ queryKey: ['waitingProducts'], queryFn: () => getWaitingProducts() });  
    const { mutateAsync: mutateNewApprove } = useMutation({ 
        mutationKey: ['newApprove'], 
        mutationFn: (productName) => postNewApprove(productName) 
    }); 

    const [displayed, setDisplayed] = useState([])
    const navigate = useNavigate();
    let textArray = data.infoAbtProduct;
    
    const handleApprove = async (productName) => {
        try {
            await mutateNewApprove(productName);
        } catch (error) {
          console.error('Error inserting data:', error);
        }
    }

    useEffect(() => {
        textArray.push(" ");
    }, [])

    useEffect(() => {
        setDisplayed(waitingProducts)
    }, [waitingProducts])
    
    return (
        <div className={classes.AddNewProduct}>
            <img src={Background} className={classes["background-image"]} />
            <img src={SVGImage1} className={classes["svg-image1"]} />
            <img src={SVGImage2} className={classes["svg-image2"]} />

            <div className={classes.bigContainer}>
                <BigTitle className={classes.title}>תוצרים לאישור:</BigTitle>
                <div className={classes[`textContainer`]}>
                    {textArray.map((text, i) => (<a key={text}> {text} </a>))}
                </div>
                <section className={classes["productsContainer"]}>
                    { (displayed && displayed.length > 0)
                    ?
                    displayed.map((product) => (
                        <div className={classes.listContainer}>
                            <ListItem
                                key={product["product_name"]}
                                productName={product["product_name"]}
                                productAuthor={product["product_author"]}
                                productUrl={product["product_url"]}
                                productType={product["product_type"]}
                                productMegama={product["product_megama"]}
                                productDate={product["product_date"]}
                                productDescription={product["product_description"]}
                            />   
                            <div onClick={() => handleApprove(product["product_name"])} className={`${classes["btn"]} ${classes["submitBtn"]}`}>אישור</div>
                        </div>
                        ))
                    :
                        <NoProducts text={"אין כרגע תוצרים ממתינים..."}/>
                    }
                </section>
                <div onClick={() => {setCurrLink("/products"); navigate(`/products`)}} className={`${classes["btn"]} ${classes["backToMain"]}`}> חזרה לאתר </div>
            </div>
        </div>
    );
};

export default ApproveProducts;