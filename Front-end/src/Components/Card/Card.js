import React from "react";
import { useHistory } from "react-router";
import "./Card.css";

const Card = (props) => {
  const { name, price, author, bookImage, _id } = props.book;
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/checkout/${id}`);
  };

  return (
    <div className="col-md-6 col-lg-4 g-4">
      <div className="card card-custom">
        <div className="image-div">
          <img src={bookImage} className="card-img-top img-fluid" alt="" />
        </div>
        <div className="card-body">
          <h5 className="card-title"> {name} </h5>
          <p className="card-text"> {author} </p>
          <div className="d-flex justify-content-between">
            <h2>$ {price} </h2>
            <button onClick={() => handleClick(_id)} className="btn buy-button">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
