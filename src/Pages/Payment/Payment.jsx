import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataContext";
import ProductCard from "../../Components/PRODUCT/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrentFormat from "../../Components/CurrentFormate/CurrentFormat";

function Payment() {
  const [cardError, setCardError] = useState(null);
  const [{ basket, user }, dispatch] = useContext(DataContext);
  console.log(user.email, dispatch);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      "YOUR_CLIENT_SECRET_FROM_BACKEND",
      {
        payment_method: {
          card: cardElement,
        },
      },
    );

    if (error) {
      console.log(error.message);
    } else {
      console.log("succesfully pay", paymentIntent);
   
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
        <div className={classes.flexs}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane </div>
            <div>Chicago,lL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flexs}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flux={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flexs}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment__details} >
              <form action="" onSubmit={handleSubmit}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />
                <div className={classes.payment__price} >
                  <div>
                    <span style={{display:"flex",gap:'10'}} >
                     <p> Total Order | </p><CurrentFormat amount={total} />
                    </span>
                  </div>
                  <button>Pay Now</button>
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
