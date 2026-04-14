import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import { MoonLoader } from "react-spinners";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataContext";
import ProductCard from "../../Components/PRODUCT/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrentFormat from "../../Components/CurrentFormate/CurrentFormat";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utility/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";
function Payment() {
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [{ basket, user }, dispatch] = useContext(DataContext);
  console.log(dispatch);
  // console.log(user.email, dispatch);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  // console.log(stripe, elements);
  const navigate = useNavigate();
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      dispatch({ type: Type.EMPTY_BASKET });
      console.log(paymentIntent);
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      setProcessing(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  return (
    <Layout>
      {/* header */}
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.Payment}>
        <div className={classes.flx}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane </div>
            <div>Chicago,lL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flx}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flux={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flx}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment__details}>
              <form action="" onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10" }}>
                      <p> Total Order | </p>
                      <CurrentFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ?
                      <div className={classes.loading}>
                        <MoonLoader size={12} />
                        <p>please wait ...</p>
                      </div>
                    : "pay now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
