import React, { useState } from "react";
import "../styles/MenuItem.css";

const MenuItem = (props) => {
  const [itemCount, setItemCount] = useState(0);
  const imgURL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";
  return (
    <div className="menu-item">
      <div>
        <h2>{props.name}</h2>
        <p>Rs. {props.price / 100}</p>
      </div>
      <div className="item-add">
        <img
          src={imgURL + props.img}
          alt="item image"
          className="menu-item-image"
        />
        {itemCount === 0 ? (
          <button onClick={() => setItemCount(itemCount + 1)}>Add</button>
        ) : (
          <div className="add-btn">
            <button onClick={() => setItemCount(itemCount - 1)}>-</button>
            <button>{itemCount}</button>
            <button onClick={() => setItemCount(itemCount + 1)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
