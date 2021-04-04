import React, { useState } from "react";

const OrderTable = (props) => {
  const [click, setClick] = useState(true);
  console.log(props.order);
  const { name, email, orderTime, price } = props.order;
  console.log(name);

  return (
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{orderTime}</td>
        <td>{price}</td>
        <td>{email}</td>
        <td>
          <button onClick={() => setClick(!click)} className="btn btn-primary">
            {click ? "Approve" : "✅Approved"}
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default OrderTable;
