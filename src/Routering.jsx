import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import Signup from './Pages/Auth/Signup'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetal from './Pages/ProductDetail/ProductDetal'
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
const stripePromise = loadStripe("pk_test_51T10WkFIS43wZkSXpDhzsyBuxvamsbbLNVpjiR3Oe1tjCkpjz3iJc8sIf0YT2NJC7nNPOOUD4ie3RRYqH3lzGCyB00PaMj97mo");
function Routering() { 

  return (
 <Router>
    <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Signup/>}/>
        <Route path='/payment' element={
          <Elements stripe={stripePromise}  >
          <Payment/>
             </Elements>          
          }/>
        <Route path='/order' element={<Orders/>}/>
        <Route path='/category/:catagoryName' element={<Results/>} />
        <Route path='/products/:productId' element ={<ProductDetal/>}/>
        <Route path='/Cart' element={<Cart/>}/>
    </Routes>
 </Router>
  )
}
export default Routering
