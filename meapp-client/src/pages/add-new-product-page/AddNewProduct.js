import React, { useState, useEffect, } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from "react-router";

import { FormControl, MenuItem, Select, TextField, Autocomplete, ThemeProvider, createTheme, } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import BigTitle from '../../components/ui/big-title/BigTitle';
import SubTitle from '../../components/ui/sub-title/SubTitle';

import Background from "../../assets/backgrounds/single-product-page.svg";
import SVGImage1 from "../../assets/backgrounds/play-button.svg";
import SVGImage2 from "../../assets/backgrounds/add-new-product-page.svg";

import classes from "./AddNewProduct.module.css"
import data from "../../data/content.json"

import { postNewProduct } from "../../data/requests.js"
import { postNewBlob } from "../../data/requests.js"
import { stringify } from 'stylis';

const AddNewProduct = ({ setCurrLink }) => {
    const { mutateAsync: mutateNewProduct, data: newProductResponse } = useMutation({ 
            mutationKey: ['newProduct'], 
            mutationFn: (sendProductPost) => postNewProduct(sendProductPost) 
        }); 
    const { mutateAsync: mutateNewBlob, data: newBlobResponse } = useMutation({ 
            mutationKey: ['newBlob'], 
            mutationFn: (sendBlobPost) => postNewBlob(sendBlobPost) 
        }); 

    let textArray = data.infoAbtProduct
    const typeArray = data.filterButtons.map((btn) => btn.id).filter((type) => type !== "all");
    const megamaArray = data.megamaList;
    const navigate = useNavigate();

    const [showError, setShowError] = useState(false);
    const [formData, setFormData] = useState({
        productName: '',
        productAuthor: '',
        productUrl: '',
        productType: '',
        productMegama: '',
        productDate: '',
        productImage: '',
        productDescription: '',
    });

    const theme = createTheme({
        components: {
          MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        backgroundColor: 'white', 
                        borderRadius: '30px', 
                    },
                    '& .MuiInputBase-input': {
                        color: '#25161B', 
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#B1A3A7',
                    },
                    // '& .MuiSelect-select': {
                    //     backgroundColor: 'white', 
                    //     borderRadius: '30px',
                    // },
                },
            },
          },
        },
    });

    const handleChange = (e, newValue) => {
        // handle productMegama, productDate
        if (typeof e === 'string') {
            setFormData((prevData) => ({
                ...prevData,
                [e]: newValue.length > 1 ? newValue.join(', ') : newValue.toString()
            }));
        } 
        // handle new productImage
        else if (e.target.name === "productImage") {
            const selectedImage = e.target.files[0];
            if (selectedImage) {
                setFormData((prevData) => ({
                    ...prevData,
                    "productImage": selectedImage
                }));
            }
        }
        // handle productName, productAuthor, productUrl, productType, productDescription
        else {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const validateFormData = () => {
        for (const value of Object.values(formData)) {
            if ((typeof value === 'string' && value.trim() === '') || formData.productImage === '' || formData.productMegama.length === 0) {
                return false;
            } 
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateFormData()) {
            try {
                const sendProductPost = formData
                const sendBlobPost = {
                    blob: formData.productImage,
                    name: formData.productName
                }
                await mutateNewBlob(sendBlobPost);
                await mutateNewProduct(sendProductPost);
            } catch (error) {
              console.error('Error inserting data:', error);
            }
            setShowError(false);
        } else {
            setShowError(true);
        }
    };

    useEffect(() => {
        setShowError(false);
    }, [formData])

    return (
        <div className={classes.AddNewProduct}>
            <img src={Background} className={classes["background-image"]} />
            <img src={SVGImage1} className={classes["svg-image1"]} />
            <img src={SVGImage2} className={classes["svg-image2"]} />

            <section className={classes["formContainer"]}>
            {newProductResponse && newBlobResponse ?
                <>
                    <div>מזל טוב!! התוצר שלכם נקלט במערכת</div>
                    <div onClick={() => {setCurrLink("/products"); navigate(`/products`)}} className={`${classes["submitBtn"]} ${classes["backToMain"]}`}> חזרה לאתר </div>
                </>
                :
                <ThemeProvider theme={theme}>
                    <BigTitle style={{ color: "#AE0149", fontSize: "2rem" }}>הוספת תוצר חדש</BigTitle>
                    <SubTitle style={{ color: "#AE0149", fontSize: "1rem" }}>מלאו את כל הסעיפים בהתאם לתוצר החדש שתרצו להוסיף :)</SubTitle>

                    <FormControl style={{ flexDirection: "row", marginTop: "17px" }} className={classes[`formControl`]}>
                        <div className={classes[`formTexts`]}>
                            {textArray.map((text) => (<a key={text}> {text}: </a>))}
                        </div>
                        <div className={classes[`formInputs`]}>
                            <TextField 
                                name="productName" 
                                value={formData.productName} 
                                onChange={handleChange} 
                                required
                                fullWidth 
                            />
                            <TextField 
                                name="productAuthor" 
                                value={formData.productAuthor} 
                                onChange={handleChange} 
                                required
                                fullWidth 
                            />
                            <TextField 
                                name="productUrl" 
                                value={formData.productUrl} 
                                onChange={handleChange} 
                                required
                                fullWidth 
                            />
                            <Select 
                                name="productType" 
                                value={formData.productType} 
                                onChange={handleChange} 
                                required 
                                fullWidth 
                            >
                                {typeArray.map((type) => (
                                    <MenuItem key={type} value={type}> {type} </MenuItem>
                                ))}
                            </Select>
                            <Autocomplete 
                                name="productMegama" 
                                options={megamaArray}
                                getOptionLabel={(option) => option}
                                renderInput={(megama) => <TextField {...megama} />}
                                onChange={(event, newValue) => handleChange("productMegama", newValue)}
                                multiple
                                required 
                                fullWidth 
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker 
                                    name="productDate" 
                                    onChange={(date) => handleChange("productDate", date)} 
                                    required
                                />
                            </LocalizationProvider>
                            { formData.productImage ?
                                <div className={classes.imageContainer}>
                                    <img src={URL.createObjectURL(formData.productImage)} alt='img' className={classes.uploadedImage}/>
                                    <div className={classes.resetBtn} onClick={() => setFormData((prevData) => ({...prevData,"productImage": ''}))}>RESET</div>
                                </div>
                                :
                                <input 
                                name="productImage" 
                                type="file" 
                                accept="image" 
                                onChange={handleChange} 
                                required
                                // style={{ width: "100%", backgroundImage: CloudUploadIcon }} 
                            />}
                            <TextField 
                                name="productDescription" 
                                value={formData.productDescription} 
                                onChange={handleChange} 
                                required
                                fullWidth 
                            />
                        </div>
                    </FormControl>
                    <div onClick={handleSubmit} className={classes.submitBtn}> הוסיפו אותי! </div>
                    {showError && <div>וודאו שכל הסעיפים מלאים!</div>}
                </ThemeProvider>
            }
            </section>
        </div>
    );
};

export default AddNewProduct;