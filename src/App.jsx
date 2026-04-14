// import react from 'react'
import Header from "./Components/HEADER/Header";
import CarouselBanner from "./Components/CAROUSEL/CarouselBanner";
import Catagory from "./Components/CATAGORY/Catagory";
import Product from "./Components/PRODUCT/Product";
import Routering from "./Routering.jsx";
import { useContext, useEffect } from "react";
import { DataContext } from "./Components/DataProvider/DataContext.jsx";
import {auth} from './Utility/firebase.js'
import { Type } from "./Utility/action.type.js";
function App() {
  const [{user} , dispatch]=useContext(DataContext);
  console.log(user)
useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{
 if(authUser){
  dispatch({
    type:Type.SET_USER,
    user:authUser


  })
 }else{
  dispatch({
    type:Type.SET_USER,
user:null
  })
 }
})

},[])
  return (
    <>

    
 <Routering/>

    </>
  );
}

export default App;
