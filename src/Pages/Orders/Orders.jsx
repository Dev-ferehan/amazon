import React, { useContext, useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./order.module.css";
import { db } from "../../Utility/firebase";
import ProductCard from "../../Components/PRODUCT/ProductCard";
import { DataContext } from "../../Components/DataProvider/DataContext";
function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [Orders, setOrders] = useState([]);
  console.log(dispatch);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);

          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {Orders?.length == 0 && (
            <div style={{ padding: "20px" }}>you don't have orders yet.</div>
          )}
          <div>
            {Orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
