import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import OrderTable from "../OrdersTable/OrderTable";

const OrderSection = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    fetch(
      "http://localhost:3002/mailData?email=" +
        loggedInUser.email,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="container">
      <h2>Order List: {orders.length} orders </h2>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Order Name</th>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
            <th scope="col">Client Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {orders.map((order) => (
          <OrderTable order={order} />
        ))}
      </table>
    </div>
  );
};

export default OrderSection;
