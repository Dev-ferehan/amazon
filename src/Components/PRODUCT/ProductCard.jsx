import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrentFormat from "../CurrentFormate/CurrentFormat";
import {Link} from 'react-router-dom'
import classes from "./product.module.css";
import { DataContext } from "../DataProvider/DataContext";
import {Type} from '../../Utility/action.type'
function ProductCard({ product, flux ,renderDesc, addButton}) {
  const {id, title, price, image, rating,
    description
     } = product;

     const [state,dispatch]=useContext(DataContext)
// console.log("prodect Card state",state)
const addToCart=()=>{
  dispatch({
    type:Type.ADD_TO_BASKET,
    item:{
     id, title, price, image, rating,
    description
    }
  })
}
  return ( 
    <div className={`${classes.card_container} ${flux ?classes.container_flux : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{maxWidth:"500px"}}>{description}</div> }
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div className={classes.price}>
          <CurrentFormat amount={price} />
        </div>
       { 
addButton && <button className={classes.button} onClick={addToCart} >add to cart</button>
       } 
       
      </div>
    </div>
  );
}

export default ProductCard;
