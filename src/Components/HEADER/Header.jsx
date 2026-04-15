import React from "react";
import amazon_logo from "./img/amazon_logo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import Flag from "./img/america_flag.png";
import LowerHeader from "./LowerHeader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { auth } from "../../Utility/firebase.js";
import { DataContext } from "../DataProvider/DataContext.jsx";
const Header = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  console.log(dispatch);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <Link className={classes.logo_containers} to="/">
            {/* image white amazon png */}
            <img
              src={amazon_logo}
              alt=""
              className={classes.logo_container}
              width={"130x"}
              height={"30px"}
            />
          </Link>
          <div className={classes.delivery}>
            <span>
              <LocationOnIcon />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <SearchIcon />
          </div>
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img src={Flag} alt="" />
              <select name="" id="">
                <option value="">En</option>
              </select>
            </Link>
          </div>
          <Link to={!user && "/auth"} className={classes.signIn}>
            <div>
              {user ?
                <>
                  <p>hello {user?.email.split("@")[0]} </p>
                  <span onClick={() => auth.signOut()}>sign out</span>
                </>
              : <>
                  <p>Sign In</p>
                  <span><b>Account & Lists</b></span>
                </>
              }
            </div>
          </Link>

          <Link to="/Orders" className={classes.return}>
            <p>returns</p>
            <span><b>& Orders</b></span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <span>{totalItem}</span>
            <ShoppingCartIcon />
          </Link>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
