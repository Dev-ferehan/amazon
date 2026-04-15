import React from "react";
import CarouselBanner from "../../Components/CAROUSEL/CarouselBanner";
import Catagory from "../../Components/CATAGORY/Catagory";
import Product from "../../Components/PRODUCT/Product";
import Layout from "../../Components/Layout/Layout";
import BookShelf from "../../Components/BookShelf/BookShelf.JSX";
import UpperFooter from "../../Components/FOOTER/UpperFooter";
function Landing() {
  return (

      <Layout>
        <CarouselBanner />
        <Catagory />
        <BookShelf/>
        <Product />
        <UpperFooter/>
      </Layout>
  
  );
}

export default Landing;
