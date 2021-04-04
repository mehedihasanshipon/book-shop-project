import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../App";
import "./CheckOut.css";

const CheckOut = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [click, setClick] = useState(true);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(book);
  useEffect(() => {
    fetch(`http://localhost:3002/checkout/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, []);

  const handleCheckoutClick = () => {
    const orderBook = { ...book };
    orderBook.orderTime = new Date().toString();
    orderBook.email = loggedInUser.email;
    //   console.log(orderBook);
    setBook(orderBook);
    fetch("http://localhost:3002/addOrder", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(orderBook),
    })
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="container">
      <div className="mt-5 checkout-section">
        <h2>Checkout </h2>
        <div className="checkout">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {book.name} </td>
                <td>1</td>
                <td>{book.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end">
          <button onClick={handleCheckoutClick} className="btn checkout-btn">
            {!book.orderTime ? "Checkout" : "✅ Purchased"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
