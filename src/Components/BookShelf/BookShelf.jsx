import React, { useEffect, useRef, useState } from 'react'
import { books } from '../../assets/assets'
import classes from './book.module.css'
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
function BookShelf() {
const [img,setImg]=useState([]);
const fetchImage=async ()=>{
setImg(books)
}
const rowRef=useRef(null)
const scrollGallery=(direction)=>{
    if(rowRef.current){
        const scrollAmount=500;
        if(direction==='left'){
        rowRef.current.scrollLeft-=scrollAmount;
        }else{
            rowRef.current.scrollLeft+=scrollAmount;
        }
    }
}
useEffect(()=>{
   const fetchedimg=async ()=> fetchImage();
   fetchedimg()
},[])
console.log("book sheilf",img)

  return (
    <>
<h2 >Top Sellers in Books for you</h2>

    <div className={classes.container }>
    <div
            className={classes.arrow}
            onClick={() => scrollGallery("left")}
          >
<RiArrowLeftSLine size={40} /> 
    </div>
<div className={classes.shelf_container} ref={rowRef} >
{
    img.map((imgs,i)=>( 
        <img key={i}  src={imgs}  alt='booksimage'/>
    ))
} 
</div>

          <div
            onClick={() => scrollGallery("right")}
            className={classes.arrow}
          >
<RiArrowRightSLine size={40}/>
          </div>

      
    </div>
  </>

  )
}

export default BookShelf
